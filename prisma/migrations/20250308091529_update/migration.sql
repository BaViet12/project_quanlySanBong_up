/*
  Warnings:

  - You are about to drop the column `cart_id` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `confirmed_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `fields` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `start_time` on the `timeslot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_time` on the `timeslot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `Booking_cart_id_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `cart_id`,
    MODIFY `created_at` TIMESTAMP NOT NULL,
    MODIFY `confirmed_at` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `fields` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `price` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `timeslot` MODIFY `start_time` DATETIME NOT NULL,
    MODIFY `end_time` DATETIME NOT NULL;
