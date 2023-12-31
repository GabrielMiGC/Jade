CREATE DATABASE IF NOT EXISTS jade;

USE jade;

CREATE USER 'admin'@'%' IDENTIFIED BY 'TeamJade';

GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    cpf VARCHAR(11)
);

CREATE TABLE Funcionario (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    cpf VARCHAR(11),
    cargo VARCHAR(100) NOT NULL
);

CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE,
    descricao VARCHAR(1000)
);

CREATE TABLE Pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    metodo_pagamento VARCHAR(50) NOT NULL,
    valor FLOAT NOT NULL,
    id_cliente INT NOT NULL,
    id_funcionario INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario) ON DELETE CASCADE
);

CREATE TABLE Produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    quantidade_em_estoque INT NOT NULL,
    id_categoria INT NOT NULL,
    preco FLOAT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE CASCADE
);

CREATE TABLE Cartoes (
    id_cartoes INT AUTO_INCREMENT PRIMARY KEY,
    numero_cartao VARCHAR(50),
    nome_titular VARCHAR(100),
    data_validade VARCHAR(8),
    cvv INT,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE Endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    rua VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cep VARCHAR(11) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    complemento VARCHAR(100),
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE Pedido_Produto (
    id_pedido INT,
    id_produto INT,
    quantidade INT NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto) ON DELETE CASCADE
);

CREATE TABLE Carrinho (
    id_cliente INT,
    id_produto INT,
    quantidade INT,
    PRIMARY KEY (id_cliente, id_produto),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto) ON DELETE CASCADE
);

INSERT INTO Categoria (nome, descricao) 
 VALUES ('Brincos', ' Confeccionados com materiais refinados, como ouro, prata e uma seleção 
 de pedras preciosas, nossa coleção de brincos é uma expressão de elegância e estilo. Seja 
 para complementar o visual cotidiano com peças discretas ou para brilhar em ocasiões especiais 
 com modelos mais exuberantes, cada par de brincos reflete a qualidade e o cuidado artesanal. 
 Descubra a beleza atemporal em cada detalhe, permitindo que nossos brincos se tornem uma 
 extensão única da sua personalidade e expressão de moda.');

INSERT INTO Categoria (nome, descricao) 
 VALUES ('Aneis', 'Apresentamos uma diversidade de opções que abrangem desde designs clássicos 
 até propostas contemporâneas. Nossos anéis são confeccionados com materiais finos, incluindo 
 ouro, prata e uma variedade de pedras preciosas, proporcionando uma gama de escolhas para 
 todos os gostos. Seja para ocasiões especiais ou para o uso diário, nossa coleção de anéis 
 destaca-se pela elegância atemporal, oferecendo aos clientes a oportunidade de expressar 
 sua individualidade através de peças que combinam estilo e sofisticação.');


INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Argola Grande de Ouro', 'blablabla', 20, 1, 128.90);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Argola Quadrada com Pedras', 'blablabla', 20, 1, 138.90);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Brinco Dourado com Perolas', 'blablabla', 20, 1, 200.00);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Argola Pequena Dourada', 'blablabla', 20, 1, 210.00);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Anel de Esmeralda sem Ouro', 'blablabla', 20, 2, 628.90);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Alianca de Ouro', 'blablabla', 20, 2, 138.90);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Anel Duplo em Ouro', 'blablabla', 20, 2, 200.00);

INSERT INTO Produto(nome, descricao, quantidade_em_estoque, id_categoria, preco)
 VALUES ('Anel Coroa Dourado', 'blablabla', 20, 2, 210.00);
