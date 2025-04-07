-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_gownId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "gownId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_gownId_fkey" FOREIGN KEY ("gownId") REFERENCES "Gown"("id") ON DELETE SET NULL ON UPDATE CASCADE;
