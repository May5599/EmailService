import { emailQueue } from '../../lib/queue'; // Assuming emailQueue is set up correctly
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, html, dayOfWeek, timeOfDay } = req.body;

    try {
      // Save the job to the database
      const emailJob = await prisma.emailJob.create({
        data: {
          to,
          subject,
          html,
          status: 'pending',
          dayOfWeek,  // Day of the week when email should be sent
          timeOfDay,  // Time of day when email should be sent (HH:mm format)
        },
      });

      console.log(`📩 New job created with ID: ${emailJob.id}`);

      // Generate cron expression from provided timeOfDay (HH:mm format) and dayOfWeek
      const [hour, minute] = timeOfDay.split(':');
      const cronExpression = `0 ${minute} ${hour} * * ${dayOfWeek}`;
      console.log(`⏰ Cron Expression: ${cronExpression}`);

      // Schedule the cron job
      cron.schedule(cronExpression, async () => {
        console.log(`🔄 Sending scheduled email for Job ID: ${emailJob.id}`);

        // Add the job to the email queue for background processing
        await emailQueue.add({
          to,
          subject,
          html,
          jobId: emailJob.id,  // Include jobId for tracking
        });
      });

      res.status(200).json({ message: 'Email scheduled!', jobId: emailJob.id });
    } catch (error) {
      console.error('🚨 Error scheduling email:', error);
      res.status(500).json({ message: 'Failed to schedule email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
