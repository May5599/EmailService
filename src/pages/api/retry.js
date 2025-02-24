import { emailQueue } from '../../lib/queue';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { jobId } = req.body;

    // Fetch the failed job from the database
    const job = await prisma.emailJob.findUnique({ where: { id: jobId } });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Retry the job
    await emailQueue.add({ to: job.to, subject: job.subject, html: job.html });

    // Update job status in the database
    await prisma.emailJob.update({
      where: { id: jobId },
      data: { status: 'pending' },
    });

    res.status(200).json({ message: 'Email retried!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}