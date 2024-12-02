/*
  Warnings:

  - You are about to alter the column `created_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `fields` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The values [DANGXULY,DAXACNHAN,DAHUY] on the enum `Timeslot_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `status` ENUM('DANGXULY', 'DAXACNHAN', 'DAHUY') NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `fields` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `price` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `timeslot` MODIFY `status` ENUM('TRONG', 'DADAT') NOT NULL;
