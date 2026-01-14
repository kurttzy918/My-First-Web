-- Create database
CREATE DATABASE IF NOT EXISTS ims_contact_db;
USE ims_contact_db;

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  service VARCHAR(100),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_email ON contact_inquiries(email);
CREATE INDEX idx_status ON contact_inquiries(status);
CREATE INDEX idx_created_at ON contact_inquiries(created_at);

-- Create view for quick stats
CREATE VIEW inquiry_stats AS
SELECT 
  COUNT(*) as total_inquiries,
  SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_inquiries,
  SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_inquiries,
  DATE(created_at) as inquiry_date
FROM contact_inquiries
GROUP BY DATE(created_at);

-- Create admin user for the API (optional)
-- CREATE USER 'ims_admin'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT ALL PRIVILEGES ON ims_contact_db.* TO 'ims_admin'@'localhost';
-- FLUSH PRIVILEGES;