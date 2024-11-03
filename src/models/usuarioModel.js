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

module.exports = {
    autenticar,
    cadastrar,
    verificarCadastro
};