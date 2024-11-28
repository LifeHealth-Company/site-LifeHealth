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

function excluirFuncionario(idFuncionario){
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Editando funcionário com ID: ", idFuncionario);
    
    var instrucaoSql = `
    DELETE FROM Usuario WHERE idUsuario = ${idFuncionario}
`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}

function buscarTipoInstituicao(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Buscando tipo de instituição para a empresa com ID: ", idEmpresa);
    
    var instrucaoSql = `
      SELECT tipoInstituicao
      FROM Empresa
      WHERE idEmpresa = ${idEmpresa};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function atualizarProjecaoRepelente(estado) {
    console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando projeção de casos para o estado: ", estado);
    
    var instrucaoSql = `
        SELECT ano, COUNT(*) AS quantidade
        FROM Casos
        WHERE ufNotificacao = '${estado}'
        GROUP BY ano
        ORDER BY ano;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarProjecaoTestes(estado) {
    console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando projeção de consumo de testes para o estado: ", estado);
    
    var instrucaoSql = `
    SELECT ano, COUNT(*) AS quantidade
    FROM Casos
    WHERE ufNotificacao = '${estado}'
    GROUP BY ano
    ORDER BY ano;
`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDemanda(estado, anoInicial, anoFinal) {
    const instrucaoSql = `
        SELECT ano, COUNT(*) AS quantidade
        FROM Casos
        WHERE ufNotificacao = '${estado}' AND ano BETWEEN '${anoInicial}' AND '${anoFinal}'
        GROUP BY ano
        ORDER BY ano;
    `;
    return database.executar(instrucaoSql);
}

function buscarEstado(idEmpresa) {
    const instrucaoSql = `
      SELECT estado, nomeinstituicao, nomeResponsavel, tipoInstituicao, cnpj, cep, email
      FROM Empresa
      WHERE idEmpresa = '${idEmpresa}';
    `;
  
    return database.executar(instrucaoSql);
  }

  function buscarFuncionarioPorId(idUsuario) {
    const instrucaoSql = `
    SELECT idUsuario, nome, sobrenome, cargo, email
    FROM Usuario
    WHERE idUsuario = ${idUsuario};  -- Agora validado como número
  `;
  
    return database.executar(instrucaoSql);
  }
  
  function editarFuncionario(idUsuario, nome, sobrenome, email, cargo) {
    const instrucaoSql = `
      UPDATE Usuario
      SET nome = '${nome}', 
          sobrenome = '${sobrenome}', 
          email = '${email}', 
          cargo = '${cargo}'
      WHERE idUsuario = ${idUsuario};
    `;
  
    return database.executar(instrucaoSql);
  }
  

module.exports = {
    autenticar,
    cadastrar,
    cadastrarFuncionario,
    buscarFuncionarios,
    editarFuncionario,
    buscarFuncionarioPorId,
    verificarCadastro,
    buscarTipoInstituicao,
    excluirFuncionario,
    atualizarProjecaoRepelente,
    atualizarProjecaoTestes,
    buscarDemanda,
    buscarEstado
};