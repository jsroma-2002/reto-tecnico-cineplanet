CREATE DATABASE IF NOT EXISTS cinema;
USE cinema;

CREATE TABLE IF NOT EXISTS candystore_products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price DECIMAL(10,2) NOT NULL
);

DROP PROCEDURE IF EXISTS get_candystore_products;

CREATE PROCEDURE get_candystore_products()
BEGIN
    SELECT id, name, description, price
    FROM candystore_products;
END;
