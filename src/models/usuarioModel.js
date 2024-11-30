var database = require("../database/config");
const express = require("express");
const router = express.Router();

function autenticar(email, senha) {
  console.log("Realizando autenticação para o email:", email);

  var instrucaoSql = `
       SELECT 
    E.idEmpresa AS idEmpresa,
    E.nomeinstituicao AS nomeEmpresa,
    U.idUsuario AS idUsuario,
    U.nome AS nomeUsuario,
    U.sobrenome AS sobrenomeUsuario,
    U.cargo AS cargoUsuario,
    U.fkEmpresa AS fkEmpresa,
    U.email AS emailUsuario,
    CASE
        WHEN U.idUsuario IS NULL THEN 'Empresa'
        ELSE 'Funcionario'
    END AS tipoUsuario
FROM 
    Empresa E
LEFT JOIN 
    Usuario U
ON 
    E.idEmpresa = U.fkEmpresa
WHERE 
    (E.email = '${email}' AND E.senha = '${senha}')
    OR
    (U.email = '${email}' AND U.senha = '${senha}');
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(
  nomeInstituicao,
  nomeResponsavel,
  email,
  senha,
  estado,
  cnpj,
  cep,
  tipoInstituicao
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ",
    nomeInstituicao,
    nomeResponsavel,
    email,
    senha,
    estado,
    cnpj,
    cep,
    tipoInstituicao
  );

  var instrucaoSql = `
      INSERT INTO Empresa (nomeinstituicao, nomeResponsavel, email, senha, estado, cnpj, cep, tipoInstituicao) 
      VALUES ('${nomeInstituicao}', '${nomeResponsavel}', '${email}', '${senha}', '${estado}', '${cnpj}', '${cep}', '${tipoInstituicao}');
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarFuncionario(nome, sobrenome, cargo, email, senha, fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha,
    fkEmpresa
  );

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
  return database
    .executar(instrucaoSql, [email, cnpj])
    .then((resultado) => {
      return {
        existe: resultado[0].count > 0,
      };
    })
    .catch((erro) => {
      console.error("Erro ao verificar cadastro:", erro);
      throw erro;
    });
}

function buscarFuncionarios(fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n\n\t\t >> Buscando funcionários para a empresa com ID: ",
    fkEmpresa
  );

  var instrucaoSql = `
      SELECT idUsuario, nome, sobrenome, cargo, email, 
             DATE_FORMAT(dataCadastroFuncionario, '%d/%m/%Y') AS dataCadastroFuncionario
      FROM Usuario 
      WHERE fkEmpresa = ${fkEmpresa};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluirFuncionario(idFuncionario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n\n\t\t >> Editando funcionário com ID: ",
    idFuncionario
  );

  var instrucaoSql = `
    DELETE FROM Usuario WHERE idUsuario = ${idFuncionario}
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}

function buscarTipoInstituicao(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n\n\t\t >> Buscando tipo de instituição para a empresa com ID: ",
    idEmpresa
  );

  var instrucaoSql = `
      SELECT tipoInstituicao
      FROM Empresa
      WHERE idEmpresa = ${idEmpresa};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// --------------------Estrutura de tratativa da Dashboard da farmácia------------------------------------------------------------------------

function atualizarProjecaoRepelente(estado) {
  console.log(
    "ACESSEI O DADOS MODEL \n\n\t\t >> Buscando projeção de casos para o estado: ",
    estado
  );

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
    console.log(
      "ACESSEI O DADOS MODEL \n\n\t\t >> Buscando projeção de consumo de testes para o estado: ",
      estado
    );

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


function maioresAfetados() {
  console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Carregando os dados dos maiores afetados");

  var instrucaoSql = `
      SELECT
        SUM(CASE WHEN isPacienteGestante = 'Sim' THEN 1 ELSE 0 END) AS gestantes,
        SUM(CASE WHEN YEAR(CURDATE()) - anoNascPaciente >= 60 THEN 1 ELSE 0 END) AS idosos,
        SUM(CASE WHEN YEAR(CURDATE()) - anoNascPaciente BETWEEN 0 AND 12 THEN 1 ELSE 0 END) AS criancas
      FROM Casos
      WHERE ufNotificacao IS NOT NULL;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);

}
function buscarCasosPorEstado(estado) {
  const instrucaoSql = `
      select * from Casos where estadoNotificacao = "${estado}";
    `;

  return database.executar(instrucaoSql);
}
function buscarCasosCurados(estado) {
  const instrucaoSql = `
   select ano, count(evolucaoCaso) as cura from casos where evolucaoCaso = "Cura" and estadoNotificacao = "${estado}" group by ano;
    `;

  return database.executar(instrucaoSql);
}
function buscarPopulacao(estado, ano) {
  const instrucaoSql = `
    SELECT qtdPopulacao FROM populacao where estado = "${estado}";
    `;

  return database.executar(instrucaoSql);
}

function carregarTaxaDeIncidencia(anos) {
  console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando taxa de incidência de dengue por ano.");

  const anosString = anos.map((ano) => `'${ano}'`).join(", ");

  const instrucaoSql = `
    SELECT 
      c.ano, 
      SUM(c.idCaso) AS total_casos,
      SUM(p.qtdPopulacao) AS total_populacao,
      (SUM(c.idCaso) / SUM(p.qtdPopulacao)) * 100000 AS taxa_incidencia
    FROM Casos c
    JOIN Populacao p ON c.ano = p.ano
    WHERE c.ano IN (${anosString})
    GROUP BY c.ano
    ORDER BY c.ano;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado.");
    }
    return resultado;
  });
}

  
function carregarCasosPorEstado(ano) {
  console.log(`ACESSEI O DADOS MODEL \n\n\t\t >> Buscando casos de Dengue por estado no ano ${ano}.`);

  const anoString = `'${ano}'`;

  const instrucaoSql = `
    SELECT 
      c.estadoNotificacao, 
      COUNT(c.idCaso) AS casos
    FROM Casos c
    WHERE c.ano = ${anoString}
    GROUP BY c.estadoNotificacao
    ORDER BY casos ASC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado.");
    }
    return resultado;
  });
}

function carregarCasosPorAno(anos) {
  console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando casos por ano.");

  const anosString = anos.map((ano) => `'${ano}'`).join(", ");

  const instrucaoSql = `
      SELECT 
          c.ano, 
          COUNT(c.idCaso) AS casos
      FROM Casos c
      WHERE c.ano IN (${anosString})
      GROUP BY c.ano
      ORDER BY c.ano;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql).then((resultado) => {
      if (!resultado || resultado.length === 0) {
          throw new Error("Nenhum dado encontrado.");
      }
      return resultado;  
  }).catch(function (erro) {
      console.error(erro);
      throw new Error("Erro ao buscar dados de casos por ano.");
  });
}

function carregarCasosPorRegiao(ano) {
  console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando casos por região.");

  if (!ano) {
    throw new Error("Ano não foi informado.");
  }

  const anoString = `'${ano}'`;

  const instrucaoSql = `
      SELECT 
          c.estadoNotificacao, 
          COUNT(c.idCaso) AS quantidadeCasos
      FROM Casos c
      WHERE c.ano = ${anoString}
      GROUP BY c.estadoNotificacao
      ORDER BY quantidadeCasos DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql).then((resultado) => {
    console.log("Resultado da consulta:", resultado); 

    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado para os casos por região.");
    }

    return resultado;
  }).catch(function (erro) {
    console.error("Erro ao executar a consulta:", erro);
    throw new Error("Erro ao buscar dados de casos por região.");
  });
}



module.exports = {
  autenticar,
  cadastrar,
  cadastrarFuncionario,
  buscarFuncionarios,
  editarFuncionario,
  verificarCadastro,
  buscarTipoInstituicao,
  excluirFuncionario,
  atualizarProjecaoRepelente,
  atualizarProjecaoTestes,
  buscarDemanda,
  buscarEstado,

  buscarCasosPorEstado,
  buscarCasosCurados,
  buscarPopulacao,
  maioresAfetados,

  carregarTaxaDeIncidencia,
  carregarCasosPorEstado,
  carregarCasosPorAno,
  carregarCasosPorRegiao

};
