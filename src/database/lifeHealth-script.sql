CREATE DATABASE lifeHealth;
USE lifeHealth;


CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
cep CHAR(8),
logradouro VARCHAR(100),
numero VARCHAR(10),
uf CHAR(2),
nome VARCHAR(200)
);

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
instituicao VARCHAR(45),
cnpj CHAR(14),
tipoInstituicao VARCHAR(45),
CONSTRAINT tipoInstituicaoCheck CHECK(tipoInstituicao IN ('Pública', 'Privada')),
email VARCHAR(80),
senha VARCHAR(45),
qtdPolos INT,
fkEndereco INT,
CONSTRAINT enderecoEmpresa FOREIGN KEY(fkEndereco) REFERENCES Endereco (idEndereco) 
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

CREATE TABLE Caso (
idCaso INT PRIMARY KEY AUTO_INCREMENT,
ano CHAR(4),
ufNotificacao CHAR(2),
estadoNotificacao VARCHAR(45),
anoNascPaciente char(4),
dtNascimentoPaciente DATE,
sexoPaciente VARCHAR(45),
CONSTRAINT sexoPacienteCheck CHECK(sexoPaciente IN ('Feminino', 'Masculino')), 
gestante VARCHAR(20), 
datainternacao DATE,
sorotipo VARCHAR(5),
evolucaoCaso VARCHAR(10),
CONSTRAINT evolucaoCasoCheck CHECK(evolucaoCaso IN ('Cura', 'Ignorado',  'Óbito por outas causas', 'Óbito em investigação')), 
dataObito DATE
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
estado VARCHAR(45)
);

-- AINDA TEMOS QUE AJUSTAR COM O PROFESSOR POIS OS PARAMETROS VARIAM DE POPULAÇÃO E ESTADO 
CREATE TABLE Parametro (
idParametro INT PRIMARY KEY AUTO_INCREMENT
);



