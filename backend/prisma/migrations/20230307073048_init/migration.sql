/*
  Warnings:

  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `matches_ibfk_1`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `matches_ibfk_2`;

-- DropForeignKey
ALTER TABLE `picture` DROP FOREIGN KEY `pictures_ibfk_1`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `sessions_ibfk_1`;

-- DropTable
DROP TABLE `match`;

-- DropTable
DROP TABLE `picture`;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `swiper` INTEGER NOT NULL,
    `swiped` INTEGER NOT NULL,

    INDEX `swiped`(`swiped`),
    INDEX `swiper`(`swiper`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `user` INTEGER NOT NULL,

    INDEX `user`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `token` TEXT NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `age` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`swiper`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`swiped`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pictures` ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
