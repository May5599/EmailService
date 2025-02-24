import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample email jobs
  const emailJob1 = await prisma.emailJob.create({
    data: {
      to: 'user1@example.com',
      subject: 'Welcome to Our Service',
      html: '<h1>Welcome to our service!</h1>',
      status: 'pending',
    },
  });

  const emailJob2 = await prisma.emailJob.create({
    data: {
      to: 'user2@example.com',
      subject: 'Your Invoice is Ready',
      html: '<h1>Your invoice is attached!</h1>',
      status: 'sent',
    },
  });

  // Create analytics events for emailJob1
  await prisma.analytics.create({
    data: {
      emailId: emailJob1.id,
      event: 'open',
    },
  });

  // Create analytics events for emailJob2
  await prisma.analytics.create({
    data: {
      emailId: emailJob2.id,
      event: 'click',
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
