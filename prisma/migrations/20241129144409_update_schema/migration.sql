/*
  Warnings:

  - You are about to drop the column `status` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `fields` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `status` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `status`,
    MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `fields` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `price` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `timeslot` ADD COLUMN `status` ENUM('DANGXULY', 'DAXACNHAN', 'DAHUY') NOT NULL;
