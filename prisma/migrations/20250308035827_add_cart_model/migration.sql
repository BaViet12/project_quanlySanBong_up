-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_price_id_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `price` DROP FOREIGN KEY `Price_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `price` DROP FOREIGN KEY `Price_timeslot_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_MaVaiTro_fkey`;

-- DropForeignKey
ALTER TABLE `vaitro_quyen` DROP FOREIGN KEY `VaiTro_Quyen_MaQuyen_fkey`;

-- DropForeignKey
ALTER TABLE `vaitro_quyen` DROP FOREIGN KEY `VaiTro_Quyen_MaVaiTro_fkey`;
