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


INSERT INTO Populacao (qtdPopulacao, estado, ano)
VALUES
-- Dados de 2021
(46649132, 'SP', 2021),
(21411923, 'MG', 2021),
(17442551, 'RJ', 2021),
(15276566, 'BA', 2021),
(11516840, 'PR', 2021),
(11422973, 'RS', 2021),
(9240595, 'PE', 2021),
(9187103, 'CE', 2021),
(8294946, 'PA', 2021),
(7164788, 'SC', 2021),
(7075189, 'MA', 2021),
(7035055, 'GO', 2021),
(4667425, 'AM', 2021),
(4123006, 'ES', 2021),
(3566218, 'PB', 2021),
(3373963, 'RN', 2021),
(3337357, 'MT', 2021),
(3273227, 'AL', 2021),
(2809394, 'PI', 2021),
(2116877, 'MS', 2021),
(1532195, 'SE', 2021),
(1505483, 'RO', 2021),
(894470, 'TO', 2021),
(830661, 'AC', 2021),
(631181, 'AP', 2021),
(411878, 'RR', 2021),
(3150310, 'DF', 2021),

-- Dados de 2022
(46843855, 'SP', 2022),
(21501633, 'MG', 2022),
(17557020, 'RJ', 2022),
(15355812, 'BA', 2022),
(11584479, 'PR', 2022),
(11472772, 'RS', 2022),
(9273000, 'PE', 2022),
(9218483, 'CE', 2022),
(8337051, 'PA', 2022),
(7212810, 'SC', 2022),
(7101102, 'MA', 2022),
(7079520, 'GO', 2022),
(4714661, 'AM', 2022),
(4149065, 'ES', 2022),
(3592005, 'PB', 2022),
(3395123, 'RN', 2022),
(3351508, 'MT', 2022),
(3286255, 'AL', 2022),
(2827854, 'PI', 2022),
(2135044, 'MS', 2022),
(1540178, 'SE', 2022),
(1511091, 'RO', 2022),
(900700, 'TO', 2022),
(834300, 'AC', 2022),
(633950, 'AP', 2022),
(415600, 'RR', 2022),
(3165533, 'DF', 2022),

-- Dados de 2023
(47041000, 'SP', 2023),
(21600000, 'MG', 2023),
(17670000, 'RJ', 2023),
(15430000, 'BA', 2023),
(11650000, 'PR', 2023),
(11520000, 'RS', 2023),
(9300000, 'PE', 2023),
(9250000, 'CE', 2023),
(8380000, 'PA', 2023),
(7260000, 'SC', 2023),
(7125000, 'MA', 2023),
(7120000, 'GO', 2023),
(4750000, 'AM', 2023),
(4170000, 'ES', 2023),
(3620000, 'PB', 2023),
(3420000, 'RN', 2023),
(3370000, 'MT', 2023),
(3300000, 'AL', 2023),
(2840000, 'PI', 2023),
(2150000, 'MS', 2023),
(1550000, 'SE', 2023),
(1515000, 'RO', 2023),
(907000, 'TO', 2023),
(838000, 'AC', 2023),
(636000, 'AP', 2023),
(419000, 'RR', 2023),
(3180000, 'DF', 2023);
