/*
  Warnings:

  - Added the required column `vehicule_type` to the `Deliveryman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Deliveryman` ADD COLUMN `vehicule_type` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Consumer` (
    `profileId` INTEGER NOT NULL,
    `delevery_notification` BOOLEAN NOT NULL DEFAULT true,
    `promotionnal_notification` BOOLEAN NOT NULL DEFAULT true,
    `promotionnal_email` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Consumer_profileId_key`(`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Developer` (
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `Developer_profileId_key`(`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurator` (
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `Restaurator_profileId_key`(`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street_number` INTEGER NOT NULL,
    `street_name` VARCHAR(255) NOT NULL,
    `building_number` INTEGER NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `additionnal_adress` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdressesOfProfile` (
    `profileId` INTEGER NOT NULL,
    `adressId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`profileId`, `adressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sponsorship` (
    `sponsorId` INTEGER NOT NULL,
    `sponsoredId` INTEGER NOT NULL,
    `sponsorship_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Sponsorship_sponsoredId_key`(`sponsoredId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consumer` ADD CONSTRAINT `Consumer_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Developer` ADD CONSTRAINT `Developer_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurator` ADD CONSTRAINT `Restaurator_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdressesOfProfile` ADD CONSTRAINT `AdressesOfProfile_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdressesOfProfile` ADD CONSTRAINT `AdressesOfProfile_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Adress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_sponsorId_fkey` FOREIGN KEY (`sponsorId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_sponsoredId_fkey` FOREIGN KEY (`sponsoredId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
