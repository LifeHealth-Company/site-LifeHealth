var database = require("../database/config");
const express = require("express");
const { gerarToken } = require("../controllers/usuarioController");
const router = express.Router();

function buscarPorEmail(email) {
  const instrucaoSql = `
    (SELECT idUsuario AS id, email, nome, 'usuario' AS tipo
    FROM Usuario u
    WHERE u.email = '${email}')
    UNION ALL
    (SELECT idEmpresa AS id, email, nomeinstituicao AS nome, 'empresa' AS tipo
    FROM Empresa e
    WHERE e.email = '${email}')`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function salvarToken(email, token) {
  const verificarEmailSql = `
    SELECT 
      CASE
        WHEN EXISTS (SELECT 1 FROM usuario WHERE email = '${email}') THEN 'usuario'
        WHEN EXISTS (SELECT 1 FROM empresa WHERE email = '${email}') THEN 'empresa'
        ELSE 'inexistente'
      END AS tipo
  `;

  console.log("Executando a instrução SQL para verificar o tipo de email: \n" + verificarEmailSql);

  return database.executar(verificarEmailSql)
    .then(resultado => {
      if (resultado.length === 0 || resultado[0].tipo === 'inexistente') {
        throw new Error('Email não encontrado!');
      }

      const tipo = resultado[0].tipo;

      if (tipo === 'usuario') {
        const atualizarTokenUsuarioSql = `UPDATE usuario SET token = '${token}' WHERE email = '${email}'`;
        console.log("Executando a instrução SQL para atualizar o token do usuário: \n" + atualizarTokenUsuarioSql);
        return database.executar(atualizarTokenUsuarioSql);
      } else if (tipo === 'empresa') {
        const atualizarTokenEmpresaSql = `UPDATE empresa SET token = '${token}' WHERE email = '${email}'`;
        console.log("Executando a instrução SQL para atualizar o token da empresa: \n" + atualizarTokenEmpresaSql);
        return database.executar(atualizarTokenEmpresaSql);
      }
    })
    .catch(erro => {
      console.error("Erro ao salvar o token:", erro);
      throw erro; 
    });
}



function validarToken(token) {
  const instrucaoSql = `
    (SELECT idUsuario AS id, email, token, 'usuario' AS tipo
     FROM usuario
     WHERE token = '${token}' AND token IS NOT NULL)
    UNION
    (SELECT idEmpresa AS id, email, token, 'empresa' AS tipo
     FROM empresa
     WHERE token = '${token}' AND token IS NOT NULL)
  `;
  
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql)
    .then(resultado => {
      if (resultado.length === 0) {
        return null; 
      }
      return resultado[0];
    });
}

function atualizarSenha(email, novaSenha) {
  const instrucaoSql = `
      UPDATE usuario u
      SET u.senha = '${novaSenha}'
      WHERE u.email = '${email}'
  `;

  const instrucaoSqlEmpresa = `
      UPDATE empresa e
      SET e.senha = '${novaSenha}'
      WHERE e.email = '${email}'
  `;

  console.log("Executando a instrução SQL para atualizar a senha: \n" + instrucaoSql);
  return database.executar(instrucaoSql)
      .then(() => {
          console.log("Executando a instrução SQL para atualizar a senha da empresa: \n" + instrucaoSqlEmpresa);
          return database.executar(instrucaoSqlEmpresa);
      });
}



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

function carregarTaxaDeIncidencia(anos, estado) {
  console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando taxa de incidência de dengue por ano e estado.");

  const anosString = anos.map((ano) => `'${ano}'`).join(", ");
  const estadoString = estado ? `AND c.ufNotificacao = '${estado}'` : '';

  const instrucaoSql = `
    SELECT 
      c.ano, 
      c.ufNotificacao AS estadoNotificacao,
      SUM(c.idCaso) AS total_casos,
      SUM(p.qtdPopulacao) AS total_populacao,
      (SUM(c.idCaso) / SUM(p.qtdPopulacao)) * 100000 AS taxa_incidencia
    FROM 
      Casos c
    JOIN 
      Populacao p 
      ON c.ano = p.ano AND c.ufNotificacao = p.estado
    WHERE 
      c.ano IN (${anosString}) ${estadoString}
    GROUP BY 
      c.ano, c.ufNotificacao
    ORDER BY 
      c.ano;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado.");
    }
    return resultado;
  });
}

  
function carregarCasosPorEstado(anoInicial, anoFinal) {
  console.log(`ACESSEI O DADOS MODEL \n\n\t\t >> Buscando casos de Dengue por estado no período de ${anoInicial} a ${anoFinal}.`);

  const instrucaoSql = `
    SELECT 
      c.estadoNotificacao, 
      COUNT(c.idCaso) AS casos
    FROM Casos c
    WHERE c.ano BETWEEN '${anoInicial}' AND '${anoFinal}'
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

function carregarCasosPorRegiao(anoInicial, anoFinal) {
  console.log(`ACESSEI O DADOS MODEL \n\n\t\t >> Buscando casos de Dengue por região no período de ${anoInicial} a ${anoFinal}.`);

  const instrucaoSql = `
    SELECT 
      c.estadoNotificacao, 
      COUNT(c.idCaso) AS quantidadeCasos
    FROM Casos c
    WHERE c.ano BETWEEN '${anoInicial}' AND '${anoFinal}'
    GROUP BY c.estadoNotificacao
    ORDER BY quantidadeCasos ASC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado.");
    }
    return resultado;
  });
}


function buscarMediaCasosPorAno(anos) {
  console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando média de casos por ano.");

  const anosString = anos.map((ano) => `'${ano}'`).join(", ");

  const instrucaoSql = `
    SELECT 
      ano, 
      COUNT(idCaso) AS totalCasos,
      COUNT(idCaso) / 365 AS mediaCasosPorDia
    FROM Casos
    WHERE ano IN (${anosString})
    GROUP BY ano
    ORDER BY totalCasos DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado.");
    }
    return resultado;
  });
}

function buscarTaxaMortalidade(anos) {
  console.log("ACESSEI O DADOS MODEL \n\n\t\t >> Buscando taxa de mortalidade.");

  const anosString = anos.map((ano) => `'${ano}'`).join(", ");

  const instrucaoSql = `
    SELECT 
      ano,
      COUNT(*) AS totalCasos,
      SUM(CASE WHEN evolucaoCaso = 'Óbito' OR evolucaoCaso IS NULL OR TRIM(evolucaoCaso) = '' THEN 1 ELSE 0 END) AS totalObitos,
      ROUND((SUM(CASE WHEN evolucaoCaso = 'Óbito' OR evolucaoCaso IS NULL OR TRIM(evolucaoCaso) = '' THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 2) AS taxaMortalidade
    FROM Casos
    WHERE ano IN (${anosString})
    GROUP BY ano
    ORDER BY taxaMortalidade DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  
  return database.executar(instrucaoSql).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      throw new Error("Nenhum dado encontrado.");
    }
    return resultado;
  });
}

function obterEstadosMaisAfetados(ano) {
  var instrucaoSql = `
      SELECT estadoNotificacao AS estado, COUNT(*) AS casos
      FROM Casos
      WHERE ano = '${ano}'
      GROUP BY estadoNotificacao
      ORDER BY casos DESC
      LIMIT 3; -- Limita a 3 estados
  `;
  return database.executar(instrucaoSql);
}
function calcularCrescimentoEstados(ano) {
    const anoAnterior = ano - 1;
     var instrucaoSql = `
     SELECT 
         estado,
         COALESCE(((casosAtual - casosAnterior) * 100.0 / casosAnterior), 0) AS crescimento
     FROM (
         SELECT
             c.estadoNotificacao AS estado,
             COUNT(CASE WHEN c.ano = '${ano}' THEN 1 END) AS casosAtual,
             COUNT(CASE WHEN c.ano = '${anoAnterior}' THEN 1 END) AS casosAnterior
         FROM Casos c
         WHERE c.ano IN ('${ano}', '${anoAnterior}')
         GROUP BY c.estadoNotificacao
     ) AS subquery;
     `;
      return database.executar(instrucaoSql);
}
function obterTotalCasosBrasil() {
  var instrucaoSql = `SELECT COUNT(*) AS totalCasos FROM Casos;`;
  return database.executar(instrucaoSql);
}
function maioresAfetados() {
  console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Carregando os dados dos maiores afetados");

  var instrucaoSql = `
    SELECT
      SUM(CASE WHEN isPacienteGestante NOT IN ('Ignorado', 'Não', 'Não se aplica') THEN 1 ELSE 0 END) AS gestantes,
      SUM(CASE WHEN YEAR(CURDATE()) - anoNascPaciente >= 60 THEN 1 ELSE 0 END) AS idosos,
      SUM(CASE WHEN YEAR(CURDATE()) - anoNascPaciente BETWEEN 0 AND 12 THEN 1 ELSE 0 END) AS criancas
    FROM Casos
    WHERE ufNotificacao IS NOT NULL;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function crescimentoCasosBrasil(anoAnterior, anoAtual) {
  var instrucaoSql = `
    SELECT 
        (
            (SELECT COUNT(*) FROM Casos WHERE ano = '${anoAtual}') - 
            (SELECT COUNT(*) FROM Casos WHERE ano = '${anoAnterior}')
        ) * 100.0 / (SELECT COUNT(*) FROM Casos WHERE ano = '${anoAnterior}') AS crescimento
    ;`;
  return database.executar(instrucaoSql);
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
  carregarTaxaDeIncidencia,
  carregarCasosPorEstado,
  carregarCasosPorAno,
  carregarCasosPorRegiao,
  buscarFuncionarioPorId,
  buscarMediaCasosPorAno,
  buscarTaxaMortalidade,
  obterTotalCasosBrasil,
  maioresAfetados,
  crescimentoCasosBrasil,
  obterEstadosMaisAfetados,
  calcularCrescimentoEstados,
  buscarPorEmail,
  salvarToken,
  validarToken,
  atualizarSenha
};