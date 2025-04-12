/*
  Warnings:

  - You are about to drop the column `size` on the `Gown` table. All the data in the column will be lost.
  - Added the required column `color` to the `Gown` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gown" DROP COLUMN "size",
ADD COLUMN     "color" TEXT NOT NULL;
