/*
  Warnings:

  - You are about to drop the column `imagesUrl` on the `Gown` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gown" DROP COLUMN "imagesUrl";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "gownId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_gownId_fkey" FOREIGN KEY ("gownId") REFERENCES "Gown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
