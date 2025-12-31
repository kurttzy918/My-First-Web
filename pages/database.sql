CREATE DATABASE IF NOT EXISTS ims_database;
USE ims_database;

-- Users table (for admin)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes table
CREATE TABLE quotes (
    id VARCHAR(36) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    business_type VARCHAR(100),
    description TEXT,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INT,
    row_count INT,
    columns JSON,
    quote_amount DECIMAL(10,2),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (customer_email),
    INDEX idx_status (status)
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    quote_id VARCHAR(36),
    package_type VARCHAR(50),
    package_name VARCHAR(255),
    price DECIMAL(10,2),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_company VARCHAR(255),
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_reference VARCHAR(255),
    order_status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    download_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(id),
    INDEX idx_customer_email (customer_email),
    INDEX idx_payment_status (payment_status),
    INDEX idx_order_status (order_status)
);

-- Payments table
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(36),
    amount DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'PHP',
    method VARCHAR(50),
    transaction_id VARCHAR(255),
    status VARCHAR(50),
    raw_response JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- System files table
CREATE TABLE system_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(36),
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    version VARCHAR(50),
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Insert admin user (password: admin123)
INSERT INTO users (email, password, name, role) VALUES 
('admin@ims.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'admin');