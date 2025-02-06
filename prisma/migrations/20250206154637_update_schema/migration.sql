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
    `field_type` INTEGER NOT NULL,
    `status` ENUM('BAOTRI', 'HOATDONG') NOT NULL,
    `HinhAnh` VARCHAR(255) NULL,
    `MoTa` LONGTEXT NULL,
    `update_at` TIMESTAMP NOT NULL,

    UNIQUE INDEX `Fields_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `field_id` INTEGER NOT NULL,
    `timeslot_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `update_at` TIMESTAMP NOT NULL,
    `status` ENUM('TRONG', 'DADAT') NOT NULL,

    UNIQUE INDEX `Price_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Timeslot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,

    UNIQUE INDEX `Timeslot_name_key`(`name`),
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
    `price_id` INTEGER NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `paid_amount` DECIMAL(10, 2) NOT NULL,
    `payment_status` ENUM('DANGXULY', 'THANHCONG', 'THATBAI') NOT NULL,
    `receipt_image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP NOT NULL,
    `status` ENUM('DANGXULY', 'DAXACNHAN', 'DAHUY') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
