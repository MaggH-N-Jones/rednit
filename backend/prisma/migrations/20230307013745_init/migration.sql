/*
  Warnings:

  - You are about to drop the `matches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `matches_ibfk_1`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `matches_ibfk_2`;

-- DropForeignKey
ALTER TABLE `pictures` DROP FOREIGN KEY `pictures_ibfk_1`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_ibfk_1`;

-- DropTable
DROP TABLE `matches`;

-- DropTable
DROP TABLE `pictures`;

-- DropTable
DROP TABLE `sessions`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `swiper` INTEGER NOT NULL,
    `swiped` INTEGER NOT NULL,

    INDEX `swiped`(`swiped`),
    INDEX `swiper`(`swiper`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `user` INTEGER NOT NULL,

    INDEX `user`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `token` TEXT NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `age` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`swiper`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`swiped`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `picture` ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
