DROP DATABASE IF EXISTS bamazon_DB; 

CREATE DATABASE bamazon_DB; 

USE bamazon_DB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
product_sales INT(10),
department_name VARCHAR(50) NOT NULL,
price INT(10),
stock_quantity INT(10),
PRIMARY KEY (item_id)
);


CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs INT(10),
  PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "Electronics", 249.45, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crazy Rich Asian", "Books", 34.68, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Health & Household", 15.34, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BB Cream", "Beauty & Personal Care", 22.59, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scissors", "Arts, Crafts & Sewing", 10.89, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 449.45, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones", "Books", 54.67, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Health & Household", 10.24, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Honey Face Mask", "Beauty & Personal Care", 11.29, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Printer Paper", "Arts, Crafts & Sewing", 15.89, 32);

SELECT * FROM products; 