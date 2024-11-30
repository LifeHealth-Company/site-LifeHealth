CREATE DATABASE lifeHealth;
USE lifeHealth;	


CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeinstituicao VARCHAR(45),
nomeResponsavel VARCHAR(45),
tipoInstituicao VARCHAR(45),
CONSTRAINT tipoInstituicaoCheck CHECK(tipoInstituicao IN ('Pública', 'Privada', 'Rede', 'Local')),
cnpj CHAR(14),
cep char(8),
estado varchar(45),
email VARCHAR(80),
senha VARCHAR(45)
);


CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
sobrenome VARCHAR(45),
cargo VARCHAR(45),
CONSTRAINT usuarioCheck CHECK(cargo IN ('Funcionário comum', 'Administrador')),
email VARCHAR(45),
senha VARCHAR(45),
dataCadastroFuncionario DATE,
fkEmpresa INT,
CONSTRAINT empresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);


CREATE TABLE Telefone (
idTelefone INT PRIMARY KEY AUTO_INCREMENT,
ddd VARCHAR(3),
ddi VARCHAR(3),
prefixo VARCHAR(5),
sufixo VARCHAR(4),
fkEmpresa INT,
CONSTRAINT telefoneEmpresa FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa),
fkUsuario INT,
CONSTRAINT telefoneUsuario FOREIGN KEY(fkUsuario) REFERENCES Usuario (idUsuario)
);

CREATE TABLE Casos (
idCaso INT PRIMARY KEY AUTO_INCREMENT,
ano CHAR(4),
ufNotificacao CHAR(2),
estadoNotificacao VARCHAR(45),
anoNascPaciente char(4),
sexoPaciente VARCHAR(45), 
isPacienteGestante VARCHAR(50),
sorotipo VARCHAR(5),
evolucaoCaso VARCHAR(50)
);



CREATE TABLE Contato (
idContato INT PRIMARY KEY AUTO_INCREMENT,
assunto VARCHAR(100),
solicitante VARCHAR(45),
emailSolicitante VARCHAR(45)
);

CREATE TABLE Populacao (
idPopulacao INT PRIMARY KEY AUTO_INCREMENT,
qtdPopulacao INT,
estado VARCHAR(45),
ano INT
);

-- AINDA TEMOS QUE AJUSTAR COM O PROFESSOR POIS OS PARAMETROS VARIAM DE POPULAÇÃO E ESTADO 
CREATE TABLE Parametro (
idParametro INT PRIMARY KEY AUTO_INCREMENT
);


SELECT * FROM Usuario;

SELECT * FROM empresa;

SELECT * FROM Populacao;


INSERT INTO Populacao (qtdPopulacao, estado, ano)
VALUES
-- Dados de 2021
(46649132, 'São Paulo', 2021),
(21411923, 'Minas Gerais', 2021),
(17442551, 'Rio de Janeiro', 2021),
(15276566, 'Bahia', 2021),
(11516840, 'Paraná', 2021),
(11422973, 'Rio Grande do Sul', 2021),
(9240595, 'Pernambuco', 2021),
(9187103, 'Ceará', 2021),
(8294946, 'Pará', 2021),
(7164788, 'Santa Catarina', 2021),
(7075189, 'Maranhão', 2021),
(7035055, 'Goiás', 2021),
(4667425, 'Amazonas', 2021),
(4123006, 'Espírito Santo', 2021),
(3566218, 'Paraíba', 2021),
(3373963, 'Rio Grande do Norte', 2021),
(3337357, 'Mato Grosso', 2021),
(3273227, 'Alagoas', 2021),
(2809394, 'Piauí', 2021),
(2116877, 'Mato Grosso do Sul', 2021),
(1532195, 'Sergipe', 2021),
(1505483, 'Rondônia', 2021),
(894470, 'Tocantins', 2021),
(830661, 'Acre', 2021),
(631181, 'Amapá', 2021),
(411878, 'Roraima', 2021),
(3150310, 'Distrito Federal', 2021),

-- Dados de 2022
(46843855, 'São Paulo', 2022),
(21501633, 'Minas Gerais', 2022),
(17557020, 'Rio de Janeiro', 2022),
(15355812, 'Bahia', 2022),
(11584479, 'Paraná', 2022),
(11472772, 'Rio Grande do Sul', 2022),
(9273000, 'Pernambuco', 2022),
(9218483, 'Ceará', 2022),
(8337051, 'Pará', 2022),
(7212810, 'Santa Catarina', 2022),
(7101102, 'Maranhão', 2022),
(7079520, 'Goiás', 2022),
(4714661, 'Amazonas', 2022),
(4149065, 'Espírito Santo', 2022),
(3592005, 'Paraíba', 2022),
(3395123, 'Rio Grande do Norte', 2022),
(3351508, 'Mato Grosso', 2022),
(3286255, 'Alagoas', 2022),
(2827854, 'Piauí', 2022),
(2135044, 'Mato Grosso do Sul', 2022),
(1540178, 'Sergipe', 2022),
(1511091, 'Rondônia', 2022),
(900700, 'Tocantins', 2022),
(834300, 'Acre', 2022),
(633950, 'Amapá', 2022),
(415600, 'Roraima', 2022),
(3165533, 'Distrito Federal', 2022),

-- Dados de 2023
(47041000, 'São Paulo', 2023),
(21600000, 'Minas Gerais', 2023),
(17670000, 'Rio de Janeiro', 2023),
(15430000, 'Bahia', 2023),
(11650000, 'Paraná', 2023),
(11520000, 'Rio Grande do Sul', 2023),
(9300000, 'Pernambuco', 2023),
(9250000, 'Ceará', 2023),
(8380000, 'Pará', 2023),
(7260000, 'Santa Catarina', 2023),
(7125000, 'Maranhão', 2023),
(7120000, 'Goiás', 2023),
(4750000, 'Amazonas', 2023),
(4170000, 'Espírito Santo', 2023),
(3620000, 'Paraíba', 2023),
(3420000, 'Rio Grande do Norte', 2023),
(3370000, 'Mato Grosso', 2023),
(3300000, 'Alagoas', 2023),
(2840000, 'Piauí', 2023),
(2150000, 'Mato Grosso do Sul', 2023),
(1550000, 'Sergipe', 2023),
(1515000, 'Rondônia', 2023),
(907000, 'Tocantins', 2023),
(838000, 'Acre', 2023),
(636000, 'Amapá', 2023),
(419000, 'Roraima', 2023),
(3180000, 'Distrito Federal', 2023);