-- SynergySphere Database Schema
-- This file contains the complete MySQL schema for the SynergySphere team collaboration platform

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS synergysphere;
USE synergysphere;

--
-- Table structure for `Users`
-- Stores user information for registration and authentication.
--
CREATE TABLE `Users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Table structure for `Projects`
-- Stores information about each project.
--
CREATE TABLE `Projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `created_by_user_id` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`created_by_user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL
);

--
-- Table structure for `Tasks`
-- Stores details for each task within a project.
-- The `status` column will be used for your Kanban-style tracking.
--
CREATE TABLE `Tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `assigned_to_user_id` INT,
    `due_date` DATE,
    `status` ENUM('To-Do', 'In Progress', 'Done') NOT NULL DEFAULT 'To-Do',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assigned_to_user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL
);

--
-- Table structure for `ProjectMembers`
-- A join table to manage the many-to-many relationship between Users and Projects.
--
CREATE TABLE `ProjectMembers` (
    `user_id` INT NOT NULL,
    `project_id` INT NOT NULL,
    `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`, `project_id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE CASCADE
);

--
-- Table structure for `Comments`
-- Stores project-specific threaded discussions.
-- The `parent_comment_id` field allows for nested, threaded replies.
--
CREATE TABLE `Comments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `parent_comment_id` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_comment_id`) REFERENCES `Comments`(`id`) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_project_id ON Tasks(project_id);
CREATE INDEX idx_tasks_assigned_user ON Tasks(assigned_to_user_id);
CREATE INDEX idx_tasks_status ON Tasks(status);
CREATE INDEX idx_comments_project_id ON Comments(project_id);
CREATE INDEX idx_comments_user_id ON Comments(user_id);
CREATE INDEX idx_comments_parent_id ON Comments(parent_comment_id);
CREATE INDEX idx_project_members_user_id ON ProjectMembers(user_id);
CREATE INDEX idx_project_members_project_id ON ProjectMembers(project_id);
