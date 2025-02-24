import { PrismaClient } from '@prisma/client';
import { logEmailOpen, logEmailClick } from '../../lib/analytics';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { emailId, event } = req.query;

  // Validate the event type and emailId
  if (!emailId || !event || !['open', 'click'].includes(event)) {
    return res.status(400).json({ message: 'Invalid event type or missing parameters' });
  }

  try {
    // Log the event (open or click) for the given emailId
    if (event === 'open') {
      await logEmailOpen(emailId);
    } else if (event === 'click') {
      await logEmailClick(emailId);
    }

    // If it's an open event, return the 1x1 transparent pixel
    if (event === 'open') {
      res.setHeader('Content-Type', 'image/png');
      res.send(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RwAAAABJRU5ErkJggg==', 'base64'));
    } else {
      // For clicks, just send a 204 No Content response
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ message: 'Failed to track event' });
  }
}
