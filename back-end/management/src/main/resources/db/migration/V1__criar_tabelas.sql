

CREATE TABLE tb_caracteristica(
	id_caracteristica INT auto_increment,
    ds_caracteristica VARCHAR(50),
    ds_especifico VARCHAR(255),
    PRIMARY KEY(id_caracteristica)
);

CREATE TABLE tb_usuario(
	 id_usuario INT auto_increment,
	 nome VARCHAR(255) NOT NULL,
	 cpf VARCHAR(11),
	 email VARCHAR(50),
	 senha VARCHAR(100),
    PRIMARY KEY (id_usuario)
);

CREATE TABLE tb_produto(
	id_produto INT auto_increment,
    id_usuario INT,
    nm_produto VARCHAR(255),
    id_tipo_corte_carne INT,
    descricao VARCHAR(255),
    peso_peca_kg NUMERIC(20, 2),
    quantidade_pecas INT,
    preco_kg NUMERIC(20, 2),
    dt_validade DATE,
    PRIMARY KEY(id_produto),
	FOREIGN KEY ( id_usuario ) REFERENCES tb_usuario ( id_usuario ),
	FOREIGN KEY ( id_tipo_corte_carne ) REFERENCES tb_caracteristica ( id_caracteristica )
);