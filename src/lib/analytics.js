import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Log an email open event
 * @param {number} emailId - ID of the email job
 */
export const logEmailOpen = async (emailId) => {
  try {
    await prisma.analytics.create({
      data: {
        emailId,
        event: 'OPEN',
      },
    });
  } catch (error) {
    console.error('Error logging email open:', error);
  }
};

/**
 * Log an email click event
 * @param {number} emailId - ID of the email job
 */
export const logEmailClick = async (emailId) => {
  try {
    await prisma.analytics.create({
      data: {
        emailId,
        event: 'CLICK',
      },
    });
  } catch (error) {
    console.error('Error logging email click:', error);
  }
};

/**
 * Get email analytics
 * @param {number} emailId - ID of the email job
 */
export const getEmailAnalytics = async (emailId) => {
  try {
    return await prisma.analytics.findMany({
      where: { emailId },
    });
  } catch (error) {
    console.error('Error fetching email analytics:', error);
    throw error; // Optionally throw or handle gracefully
  }
};
