-- AlterTable
ALTER TABLE `Consumer` ALTER COLUMN `delevery_notification` DROP DEFAULT,
    ALTER COLUMN `promotionnal_notification` DROP DEFAULT,
    ALTER COLUMN `promotionnal_email` DROP DEFAULT;
