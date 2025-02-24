import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit; 

    try {
      // Fetch analytics data from the database with pagination
      const analytics = await prisma.analytics.findMany({
        skip,
        take: parseInt(limit),
        include: {
          emailJob: true, 
        },
        orderBy: {
          timestamp: 'desc', 
        },
      });

      console.log('Analytics data:', analytics); 

      // Count the number of "open" and "click" events
      const openCount = analytics.filter(entry => entry.event === 'OPEN').length;
      const clickCount = analytics.filter(entry => entry.event === 'CLICK').length;

      // Calculate open and click rates based on the total events
      const totalEvents = analytics.length;
      const openRate = totalEvents > 0 ? (openCount / totalEvents) * 100 : 0;
      const clickRate = totalEvents > 0 ? (clickCount / totalEvents) * 100 : 0;

      // Format the data for the frontend
      const formattedData = analytics.map((entry) => ({
        id: entry.id,
        emailId: entry.emailId,
        event: entry.event,
        timestamp: entry.timestamp,
        emailSubject: entry.emailJob ? entry.emailJob.subject : 'No Subject',
      }));

      // Send formatted data with pagination info, including the rates
      res.status(200).json({
        data: formattedData,
        page: parseInt(page),
        limit: parseInt(limit),
        openRate,
        clickRate,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
