import Bull from 'bull';
import { sendEmail } from './email';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a queue
const emailQueue = new Bull('email', process.env.REDIS_URL, {
  settings: {
    retryProcessDelay: 5000,  // Retry failed jobs after 5 seconds
    maxJobRetries: 3,         // Max retries
  },
});

// Process email jobs
emailQueue.process(async (job) => {
  const { to, subject, html, jobId } = job.data;

  console.log(`🔄 Processing job: ${jobId}, sending email to ${to}`);

  try {
    // Send the email
    await sendEmail(to, subject, html);
    console.log(`📩 Email sent successfully to ${to}`);

    // Update job status to 'completed'
    const updateResult = await prisma.emailJob.update({
      where: { id: jobId },
      data: { status: 'completed', updatedAt: new Date() },
    });

    console.log(`✅ Job ${jobId} marked as completed in database:`, updateResult);
  } catch (error) {
    console.error(`❌ Job ${jobId} failed:`, error);

    // Update job status to 'failed'
    const failedUpdate = await prisma.emailJob.update({
      where: { id: jobId },
      data: { status: 'failed', updatedAt: new Date() },
    });

    console.log(`🔴 Job ${jobId} marked as failed in database:`, failedUpdate);
    throw error; // Will trigger Bull to retry the job
  }
});

// Listen for completed jobs
emailQueue.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed:`, result);
});

// Listen for failed jobs
emailQueue.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

export { emailQueue };
