/*
  Warnings:

  - You are about to alter the column `created_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `fields` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `fields` MODIFY `update_at` TIMESTAMP NOT NULL,
    MODIFY `HinhAnh` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `price` MODIFY `update_at` TIMESTAMP NOT NULL;
