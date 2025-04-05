-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_gownId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_gownId_fkey" FOREIGN KEY ("gownId") REFERENCES "Gown"("id") ON DELETE CASCADE ON UPDATE CASCADE;
