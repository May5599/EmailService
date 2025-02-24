-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "EmailJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
