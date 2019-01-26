DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;


USE bamazon_db;


CREATE TABLE products (

  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL(8,2),
  stock_quantity INTEGER,

  PRIMARY KEY (item_id)
);

INSERT INTO products
VALUES (0,"Fast and the Furious","Movies",24.00,30);

INSERT INTO products
VALUES (0,"Halo 5","Games",45.00,50);

INSERT INTO products
VALUES (0,"Kindle Fire","Electronics",149.00,12);

INSERT INTO products
VALUES (0,"Macbook Pro 2018","Electronics",2499.00,21);

INSERT INTO products
VALUES (0,"Whiffle Bat","Toys",14.00,70);

INSERT INTO products
VALUES (0,"Bean Bag","Home Goods",220.00,5);

INSERT INTO products
VALUES (0,"Make Up Brushes","Beauty",30.00,75);

INSERT INTO products
VALUES (0,"Car Battery","Automotive",79.00,20);

INSERT INTO products
VALUES (0,"LG LCD TV","Electronics",499.00,74);

INSERT INTO products
VALUES (0,"Framed Mirror","Holiday",73.00,67);
