import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    // Create an email job in the database
    const emailJob = await prisma.emailJob.create({
      data: {
        to,
        subject,
        html,
        status: 'pending',
      },
    });

    const trackingPixel = `<img src="http://localhost:3000/api/track?emailId=${emailJob.id}&event=open" width="1" height="1" style="display:none;" />`;
    const emailContent = `${html} ${trackingPixel}`;

    // Send the email with the tracking pixel
    await transporter.sendMail({
      to,
      subject,
      html: emailContent,
      text: 'This is an HTML email. If you can\'t see it, enable HTML view.',
    });

    // Update the email job status to 'sent'
    await prisma.emailJob.update({
      where: { id: emailJob.id },
      data: { status: 'sent' },
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('🚨 Error sending email:', error);
    throw error;
  }
};
