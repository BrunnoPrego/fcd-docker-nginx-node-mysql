CREATE DATABASE IF NOT EXISTS nnmdb;
USE nnmdb;
CREATE TABLE  IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id));
GRANT ALL PRIVILEGES ON nnmdb.* TO 'root'@'%' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
