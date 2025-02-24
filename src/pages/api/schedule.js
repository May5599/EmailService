import { emailQueue } from '../../lib/queue';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, html, dayOfWeek, timeOfDay } = req.body;

    try {
      // Save job to the database first
      const emailJob = await prisma.emailJob.create({
        data: {
          to,
          subject,
          html,
          status: 'pending',
          dayOfWeek,  // Storing the day of the week
          timeOfDay,  // Storing the time of the day
        },
      });

      console.log(`📩 New job created with ID: ${emailJob.id}`);

      // Schedule a cron job for the email
      const cronExpression = `0 ${parseInt(timeOfDay.split(':')[1])} ${parseInt(timeOfDay.split(':')[0])} * * ${dayOfWeek}`;

      // Store the cron schedule in the database or queue system
      cron.schedule(cronExpression, async () => {
        console.log(`🔄 Sending scheduled email for Job ID: ${emailJob.id}`);
        
        // Add job to the queue with jobId for processing in a background worker
        await emailQueue.add({ to, subject, html, jobId: emailJob.id });
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
