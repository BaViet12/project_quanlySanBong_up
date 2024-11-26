/*
  Warnings:

  - You are about to drop the column `booking_date` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `field_id` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `time_slot_id` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `fields` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `field_id` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `timeslot` table. All the data in the column will be lost.
  - Added the required column `price_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HinhAnh` to the `Fields` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_time_slot_id_fkey`;

-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `Timeslot_field_id_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `booking_date`,
    DROP COLUMN `field_id`,
    DROP COLUMN `time_slot_id`,
    ADD COLUMN `price_id` INTEGER NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `fields` ADD COLUMN `HinhAnh` VARCHAR(191) NOT NULL,
    MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `timeslot` DROP COLUMN `field_id`,
    DROP COLUMN `price`,
    DROP COLUMN `status`,
    DROP COLUMN `update_at`;

-- CreateTable
CREATE TABLE `Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field_id` INTEGER NOT NULL,
    `timeslot_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('TRONG', 'DADAT') NOT NULL,
    `update_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_timeslot_id_fkey` FOREIGN KEY (`timeslot_id`) REFERENCES `Timeslot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Price`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
