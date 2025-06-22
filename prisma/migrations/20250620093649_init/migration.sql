/*
  Warnings:

  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `test`;

-- CreateTable
CREATE TABLE `PersonalDetail` (
    `personal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `father_name` VARCHAR(191) NULL,
    `gender` ENUM('male', 'female', 'other') NULL,
    `date_of_birth` DATETIME(3) NULL,
    `marital_status` ENUM('single', 'married', 'divorced', 'widowed') NULL,
    `address_line1` VARCHAR(191) NULL,
    `address_line2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `pincode` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL DEFAULT 'India',
    `emergency_contact_name` VARCHAR(191) NULL,
    `emergency_contact_number` VARCHAR(191) NULL,

    UNIQUE INDEX `PersonalDetail_user_id_key`(`user_id`),
    PRIMARY KEY (`personal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Qualification` (
    `qualification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `degree_level` ENUM('Diploma', 'Bachelor', 'Master', 'PhD', 'Other') NOT NULL,
    `degree_name` VARCHAR(191) NULL,
    `institution_name` VARCHAR(191) NULL,
    `specialization` VARCHAR(191) NULL,
    `start_year` INTEGER NULL,
    `end_year` INTEGER NULL,
    `grade` VARCHAR(191) NULL,
    `document_url` VARCHAR(191) NULL,

    PRIMARY KEY (`qualification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalaryMaster` (
    `salary_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `basic_pay` DECIMAL(10, 2) NOT NULL,
    `hra` DECIMAL(10, 2) NULL,
    `bonus` DECIMAL(10, 2) NULL,
    `incentives` DECIMAL(10, 2) NULL,
    `deductions` DECIMAL(10, 2) NULL,
    `gross_salary` DECIMAL(10, 2) NULL,
    `net_salary` DECIMAL(10, 2) NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `effective_from` DATETIME(3) NULL,
    `remarks` VARCHAR(191) NULL,

    PRIMARY KEY (`salary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `document_type` ENUM('Resume', 'Aadhar', 'PAN', 'Degree', 'Other') NOT NULL,
    `document_name` VARCHAR(191) NULL,
    `document_url` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectAssignment` (
    `assignment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,
    `assigned_role` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `allocation_percent` DECIMAL(5, 2) NULL,

    PRIMARY KEY (`assignment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonalDetail` ADD CONSTRAINT `PersonalDetail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Qualification` ADD CONSTRAINT `Qualification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalaryMaster` ADD CONSTRAINT `SalaryMaster_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectAssignment` ADD CONSTRAINT `ProjectAssignment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
