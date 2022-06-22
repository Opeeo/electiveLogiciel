/*
  Warnings:

  - You are about to alter the column `street_number` on the `Adress` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Adress` MODIFY `street_number` INTEGER NOT NULL;
