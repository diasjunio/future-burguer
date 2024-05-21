-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `branch_company` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Users_cpf_key`(`cpf`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersDTO` (
    `id_dto` VARCHAR(191) NOT NULL,
    `hobby` VARCHAR(191) NOT NULL,
    `dream` VARCHAR(191) NOT NULL,
    `motivation` VARCHAR(191) NOT NULL,
    `personal_reference` VARCHAR(191) NOT NULL,
    `personal_valuer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_dto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersDTO2` (
    `id_dto2` VARCHAR(191) NOT NULL,
    `academic_education` VARCHAR(191) NOT NULL,
    `academic_status` VARCHAR(191) NOT NULL,
    `interest_area` VARCHAR(191) NOT NULL,
    `strong_points` VARCHAR(191) NOT NULL,
    `develop_skills` VARCHAR(191) NOT NULL,
    `support` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `id_dto1` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_dto2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersDTO` ADD CONSTRAINT `UsersDTO_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersDTO2` ADD CONSTRAINT `UsersDTO2_id_dto1_fkey` FOREIGN KEY (`id_dto1`) REFERENCES `UsersDTO`(`id_dto`) ON DELETE RESTRICT ON UPDATE CASCADE;
