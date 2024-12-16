/*
  Warnings:

  - You are about to alter the column `created_at` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `fields` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `update_at` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `start_time` on the `timeslot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_time` on the `timeslot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `thanhtoan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Booking_price_id_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Booking_user_id_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Price_field_id_fkey` ON `price`;

-- DropIndex
DROP INDEX `Price_timeslot_id_fkey` ON `price`;

-- DropIndex
DROP INDEX `User_MaVaiTro_fkey` ON `user`;

-- DropIndex
DROP INDEX `VaiTro_Quyen_MaQuyen_fkey` ON `vaitro_quyen`;

-- DropIndex
DROP INDEX `VaiTro_Quyen_MaVaiTro_fkey` ON `vaitro_quyen`;

-- AlterTable
ALTER TABLE `booking` MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `fields` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `price` MODIFY `update_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `timeslot` MODIFY `start_time` DATETIME NOT NULL,
    MODIFY `end_time` DATETIME NOT NULL;

-- DropTable
DROP TABLE `thanhtoan`;

-- AddForeignKey
ALTER TABLE `VaiTro_Quyen` ADD CONSTRAINT `VaiTro_Quyen_MaVaiTro_fkey` FOREIGN KEY (`MaVaiTro`) REFERENCES `VaiTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VaiTro_Quyen` ADD CONSTRAINT `VaiTro_Quyen_MaQuyen_fkey` FOREIGN KEY (`MaQuyen`) REFERENCES `Quyen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_timeslot_id_fkey` FOREIGN KEY (`timeslot_id`) REFERENCES `Timeslot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_MaVaiTro_fkey` FOREIGN KEY (`MaVaiTro`) REFERENCES `VaiTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Price`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
