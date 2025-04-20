/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Gown` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Gown` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Gown` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Gown` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('longGown', 'cocktailDress', 'filipiniana', 'ballGown');

-- AlterTable
ALTER TABLE "Gown" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gown_name_key" ON "Gown"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gown_code_key" ON "Gown"("code");
