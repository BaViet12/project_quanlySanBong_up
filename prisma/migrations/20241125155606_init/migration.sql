-- CreateTable
CREATE TABLE `VaiTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Ten` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quyen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Ten` VARCHAR(191) NOT NULL,
    `MoTa` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VaiTro_Quyen` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `MaVaiTro` INTEGER NOT NULL,
    `MaQuyen` INTEGER NOT NULL,
    `Ten` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `field_type` ENUM('5', '7') NOT NULL,
    `status` ENUM('BAOTRI', 'HOATDONG') NOT NULL,
    `MoTa` LONGTEXT NULL,
    `update_at` TIMESTAMP NOT NULL,

    UNIQUE INDEX `Fields_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Timeslot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field_id` INTEGER NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('TRONG', 'DADAT') NOT NULL,
    `update_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `email` VARCHAR(100) NULL,
    `MaVaiTro` INTEGER NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,
    `time_slot_id` INTEGER NOT NULL,
    `booking_date` DATE NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('DANGXULY', 'DAXACNHAN', 'DAHUY') NOT NULL,
    `created_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VaiTro_Quyen` ADD CONSTRAINT `VaiTro_Quyen_MaVaiTro_fkey` FOREIGN KEY (`MaVaiTro`) REFERENCES `VaiTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VaiTro_Quyen` ADD CONSTRAINT `VaiTro_Quyen_MaQuyen_fkey` FOREIGN KEY (`MaQuyen`) REFERENCES `Quyen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timeslot` ADD CONSTRAINT `Timeslot_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_MaVaiTro_fkey` FOREIGN KEY (`MaVaiTro`) REFERENCES `VaiTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_time_slot_id_fkey` FOREIGN KEY (`time_slot_id`) REFERENCES `Timeslot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
