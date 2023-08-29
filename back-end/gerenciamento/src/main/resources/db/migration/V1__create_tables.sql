CREATE TABLE tb_perfil(
	id_perfil INT AUTO_INCREMENT,
    nm_perfil VARCHAR(50),
    PRIMARY KEY(id_perfil)
);

CREATE TABLE tb_estado(
	id_estado INT AUTO_INCREMENT,
    sigla VARCHAR(2),
    nm_estado VARCHAR(50),
    PRIMARY KEY(id_estado)
);

CREATE TABLE tb_cidade(
	id_cidade INT AUTO_INCREMENT,
    id_estado INT,
    nm_cidade VARCHAR(50),
    PRIMARY KEY (id_cidade),
    FOREIGN KEY (id_estado) REFERENCES tb_estado( id_estado )
);

CREATE TABLE tb_caracteristica(
	id_caracteristica INT AUTO_INCREMENT,
    ds_caracteristica VARCHAR(50),
    ds_especifico VARCHAR(255),
    PRIMARY KEY(id_caracteristica)
);

CREATE TABLE tb_loja(
	id_loja INT AUTO_INCREMENT,
    id_caracteristica INT,
    nm_loja VARCHAR(50),
    email VARCHAR(50),
    nr_cnpj INT(14),
    nr_contato INT(13),
    inscricao_estadual INT,
    fl_ativa BOOLEAN DEFAULT 1 NOT NULL,
	PRIMARY KEY (id_loja),
	FOREIGN KEY ( id_caracteristica ) REFERENCES tb_caracteristica ( id_caracteristica )
);

CREATE TABLE tb_usuario(
	 id_usuario INT AUTO_INCREMENT,
     id_perfil INT,
     id_loja INT,
	 nm_completo VARCHAR(255) NOT NULL,
	 cpf_cnpj INT(14),
	 email VARCHAR(50),
     nr_contato INT(13),
	 senha VARCHAR(255),
    PRIMARY KEY (id_usuario),
	FOREIGN KEY ( id_perfil ) REFERENCES tb_perfil ( id_perfil ),
    FOREIGN KEY ( id_loja ) REFERENCES tb_loja ( id_loja )
);

CREATE TABLE tb_endereco(
	id_endereco INT AUTO_INCREMENT,
    id_cidade INT,
    id_estado INT,
    id_usuario INT,
    id_loja INT,
	rua VARCHAR(100),
    numero INT,
    complemento VARCHAR(30),
    bairro VARCHAR(30),
    cep INT(8),
    PRIMARY KEY (id_endereco),
	FOREIGN KEY ( id_cidade ) REFERENCES tb_cidade ( id_cidade ),
	FOREIGN KEY ( id_estado ) REFERENCES tb_estado ( id_estado ),
	FOREIGN KEY ( id_usuario ) REFERENCES tb_usuario ( id_usuario ),
	FOREIGN KEY ( id_loja ) REFERENCES tb_loja ( id_loja )
);

CREATE TABLE tb_produto(
	id_produto INT AUTO_INCREMENT,
    id_loja INT,
    id_endereco INT ,
    id_caracteristica INT,
    nm_produto VARCHAR(255),
    descricao VARCHAR(255),
    tamanho VARCHAR(20),
    preco NUMERIC(20, 2),
    quantidade INT,
    dt_validade DATE,
	fl_excluido BOOLEAN DEFAULT 0 NOT NULL,
    PRIMARY KEY(id_produto),
	FOREIGN KEY ( id_loja ) REFERENCES tb_loja ( id_loja ),
	FOREIGN KEY ( id_endereco ) REFERENCES tb_endereco ( id_endereco ),
	FOREIGN KEY ( id_caracteristica ) REFERENCES tb_caracteristica ( id_caracteristica )
);

