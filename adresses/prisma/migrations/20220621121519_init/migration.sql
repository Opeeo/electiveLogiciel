/*
  Warnings:

  - Added the required column `postal_code` to the `Adress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Adress` ADD COLUMN `postal_code` INTEGER NOT NULL;
