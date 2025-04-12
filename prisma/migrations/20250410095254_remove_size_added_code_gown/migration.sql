/*
  Warnings:

  - You are about to drop the column `color` on the `Gown` table. All the data in the column will be lost.
  - Added the required column `code` to the `Gown` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gown" DROP COLUMN "color",
ADD COLUMN     "code" TEXT NOT NULL;
