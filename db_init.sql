-- ============================================================
-- Dhanyashree Homes — Database Setup
-- Run this once on your MySQL server:
--   mysql -u root -p < db_init.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS dhanyashree_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dhanyashree_db;

CREATE TABLE IF NOT EXISTS enquiries (
  id           INT UNSIGNED     NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150)     NOT NULL,
  phone        VARCHAR(20)      NOT NULL,
  email        VARCHAR(200)     DEFAULT NULL,
  budget       VARCHAR(50)      DEFAULT NULL,
  project      VARCHAR(200)     NOT NULL,
  message      TEXT             DEFAULT NULL,
  ip_address   VARCHAR(45)      DEFAULT NULL,
  status       ENUM('new','contacted','qualified','closed')
               NOT NULL DEFAULT 'new',
  submitted_at DATETIME         NOT NULL,
  updated_at   TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_project (project),
  INDEX idx_status  (status),
  INDEX idx_submitted (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Optional: create a dedicated DB user ────────────────────────
-- Replace 'db_password' with a strong password before running.
-- CREATE USER  IF NOT EXISTS 'db_user'@'localhost' IDENTIFIED BY 'db_password';
-- GRANT SELECT, INSERT, UPDATE ON dhanyashree_db.enquiries TO 'db_user'@'localhost';
-- FLUSH PRIVILEGES;
