var database = require("../database/config")
const express = require("express");
const router = express.Router();

function autenticar(email, senha) {
    console.log("ACESSEI O EMPRESA MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    
    var instrucaoSql = `
        SELECT idEmpresa AS id, nomeinstituicao AS nome, email 
        FROM Empresa 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeInstituicao, nomeResponsavel, email, senha, estado, cnpj, cep, tipoInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", nomeInstituicao, nomeResponsavel, email, senha, estado, cnpj, cep, tipoInstituicao);
    
    var instrucaoSql = `
      INSERT INTO Empresa (nomeinstituicao, nomeResponsavel, email, senha, estado, cnpj, cep, tipoInstituicao) 
      VALUES ('${nomeInstituicao}', '${nomeResponsavel}', '${email}', '${senha}', '${estado}', '${cnpj}', '${cep}', '${tipoInstituicao}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFuncionario(nome, sobrenome, cargo, email, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);
  
    var instrucaoSql = `
        INSERT INTO Usuario (nome, sobrenome,cargo, email, senha, dataCadastroFuncionario, fkEmpresa) VALUES ('${nome}', '${sobrenome}', '${cargo}', '${email}', '${senha}', NOW(), '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarCadastro(email, cnpj) {
    console.log("Verificando cadastro com email e CNPJ:", email, cnpj);

    const instrucaoSql = `
        SELECT COUNT(*) AS count 
        FROM Empresa 
        WHERE email = '${email}' OR cnpj = '${cnpj}';
    `;
    
    console.log("Executando instrução SQL:", instrucaoSql);
    return database.executar(instrucaoSql, [email, cnpj])
        .then(resultado => {
            return {
                existe: resultado[0].count > 0 
            };
        })
        .catch(erro => {
            console.error("Erro ao verificar cadastro:", erro);
            throw erro;
        });
}

function buscarFuncionarios(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Buscando funcionários para a empresa com ID: ", fkEmpresa);
    
    var instrucaoSql = `
      SELECT idUsuario, nome, sobrenome, cargo, email, 
             DATE_FORMAT(dataCadastroFuncionario, '%d/%m/%Y') AS dataCadastroFuncionario
      FROM Usuario 
      WHERE fkEmpresa = ${fkEmpresa};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarFuncionario(idFuncionario, nome, sobrenome, email, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Editando funcionário com ID: ", idFuncionario);
    
    var instrucaoSql = `
      UPDATE Usuario 
      SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', cargo = '${cargo}' 
      WHERE idUsuario = ${idFuncionario};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarFuncionario,
    buscarFuncionarios,
    editarFuncionario,
    verificarCadastro
};