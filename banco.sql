CREATE DATABASE sistema;
USE sistema;

CREATE TABLE user(
cd INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100),
senha VARCHAR(20),
status VARCHAR(20));

insert into user (nome,email,senha,status)
VALUES("Rodolfo","ro@ro",'123','on');

CREATE TABLE categoria(
cd INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100));

CREATE TABLE produto(
cd INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
descricao VARCHAR (200),
valor DECIMAL(10,2),
foto VARCHAR(100),
id_categoria INT,
FOREIGN KEY (id_categoria) REFERENCES categoria(cd)

);

CREATE TABLE pedido( 
cd INT PRIMARY KEY AUTO_INCREMENT,
data DATE,
total DECIMAL (5,2)
);

CREATE TABLE item(
id_produto INT,
id_pedido INT,
qt_produto INT,
obs_produto VARCHAR(100) NULL,
FOREIGN KEY(id_produto) REFERENCES produto(cd),
FOREIGN KEY(id_pedido) REFERENCES pedido(cd)
);