/*
  Warnings:

  - You are about to drop the `Bookings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_gownId_fkey";

-- DropTable
DROP TABLE "Bookings";

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "gownId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "customerContactInfo" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "notes" TEXT,
    "isPricePaid" BOOLEAN NOT NULL,
    "downpayment" INTEGER NOT NULL,
    "isDownpaymentPaid" BOOLEAN NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_gownId_fkey" FOREIGN KEY ("gownId") REFERENCES "Gown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
