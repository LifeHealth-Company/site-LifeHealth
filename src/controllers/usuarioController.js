var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");
const express = require("express");
const router = express.Router();

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email === undefined) {
    return res.status(400).send("Seu email está indefinido!");
  }
  if (senha === undefined) {
    return res.status(400).send("Sua senha está indefinida!");
  }

  usuarioModel
    .autenticar(email, senha)
    .then(function (resultadoAutenticar) {
      console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
      console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

      if (resultadoAutenticar.length === 1) {
        res.json({
          id: resultadoAutenticar[0].id,
          email: resultadoAutenticar[0].email,
          nome: resultadoAutenticar[0].nome,
        });
      } else if (resultadoAutenticar.length === 0) {
        res.status(403).send("Email e/ou senha inválido(s)");
      } else {
        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o login! Erro: ",
        erro.sqlMessage
      );
      res
        .status(500)
        .send("Houve um erro ao realizar o login. Tente novamente mais tarde.");
    });
}

function cadastrar(req, res) {
  var nomeInstituicao = req.body.nomeInstituicaoServer;
  var nomeResponsavel = req.body.nomeResponsavelServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var estado = req.body.estadoServer;
  var cnpj = req.body.cnpjServer;
  var cep = req.body.cepServer;
  var tipoInstituicao = req.body.tipoInstituicaoServer;

  if (nomeInstituicao == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (nomeResponsavel == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else {
    usuarioModel
      .cadastrar(
        nomeInstituicao,
        nomeResponsavel,
        email,
        senha,
        estado,
        cnpj,
        cep,
        tipoInstituicao
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function verificarCadastro(req, res) {
  const email = req.body.emailServer;
  const cnpj = req.body.cnpjServer;

  if (!email || !cnpj) {
    return res.status(400).send("E-mail e/ou CNPJ não foram fornecidos.");
  }

  usuarioModel
    .verificarCadastro(email, cnpj)
    .then((resultado) => {
      if (resultado.existe) {
        res.status(200).json({ existe: true });
      } else {
        res.status(200).json({ existe: false });
      }
    })
    .catch((erro) => {
      console.error("Erro ao verificar cadastro:", erro);
      res.status(500).json({ error: "Erro ao verificar cadastro" });
    });
}

function cadastrarFuncionario(req, res) {
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var cargo = req.body.cargoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua empresa a vincular está undefined!");
  } else {
    usuarioModel
      .cadastrarFuncionario(nome, sobrenome, cargo, email, senha, fkEmpresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function buscarFuncionarios(req, res) {
  const fkEmpresa = req.query.idEmpresa;

  if (fkEmpresa === undefined) {
    return res.status(400).send("ID da empresa está undefined!");
  }

  usuarioModel
    .buscarFuncionarios(fkEmpresa)
    .then(function (resultados) {
      if (resultados.length === 0) {
        return res
          .status(404)
          .send("Nenhum funcionário encontrado para esta empresa.");
      }
      res.json(resultados);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao buscar os funcionários! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function excluirFuncionario(req, res) {
  const idFuncionario = req.params.idUsuario;

  usuarioModel
    .excluirFuncionario(idFuncionario)
    .then(function (resultado) {
      if (resultado.affectedRows === 0) {
        res.status(404).send("Funcionário não encontrado");
      } else {
        res.send("Sucesso!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send("Erro ao excluir funcionário");
    });
}

function obterTipoInstituicao(req, res) {
  const idEmpresa = req.params.idEmpresa;

  usuarioModel
    .buscarTipoInstituicao(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json({ tipoInstituicao: resultado[0].tipoInstituicao });
      } else {
        res
          .status(404)
          .send("Tipo de instituição não encontrado para o ID fornecido.");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send("Erro ao buscar o tipo de instituição.");
    });
}

function atualizarProjecaoRepelente(req, res) {
  var estado = req.body.estadoServer;

  if (estado == undefined) {
    res.status(400).send("O estado está undefined!");
  } else {
    usuarioModel
      .atualizarProjecaoRepelente(estado)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.json(resultado);
        } else {
          res
            .status(404)
            .send("Nenhum dado encontrado para o estado informado.");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function atualizarProjecaoTestes(req, res) {
  var estado = req.body.estadoServer;

  if (estado == undefined) {
    res.status(400).send("O estado está undefined!");
  } else {
    usuarioModel
      .atualizarProjecaoTestes(estado)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.json(resultado);
        } else {
          res
            .status(404)
            .send("Nenhum dado encontrado para o estado informado.");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function buscarDemanda(req, res) {
  const { estadoServer, anoInicialServer, anoFinalServer } = req.body;

  const estado = estadoServer;
  const anoInicial = anoInicialServer;
  const anoFinal = anoFinalServer;

  if (!estado || !anoInicial || !anoFinal) {
    res.status(400).send("Dados insuficientes!");
  } else {
    usuarioModel
      .buscarDemanda(estado, anoInicial, anoFinal)
      .then((resultado) => {
        if (resultado.length > 0) {
          res.json(resultado);
        } else {
          res
            .status(404)
            .send("Nenhum dado encontrado para os parâmetros informados.");
        }
      })
      .catch((erro) => {
        console.error(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function buscarEstadoEmpresa(req, res) {
  const idEmpresa = req.params.idEmpresa;

  if (!idEmpresa || isNaN(idEmpresa)) {
    return res.status(400).send("ID da empresa inválido.");
  }

  usuarioModel
    .buscarEstado(idEmpresa)
    .then((empresa) => {
      if (!empresa) {
        return res.status(404).json({ error: "Empresa não encontrada." });
      }
      res.status(200).json(empresa);
    })
    .catch((erro) => {
      console.error("Erro ao buscar os dados da empresa:", erro);
      res.status(500).json({ error: "Erro ao buscar os dados da empresa." });
    });
}

function obterFuncionario(req, res) {
  const idUsuario = req.params.id;

  if (!idUsuario || isNaN(idUsuario)) {
    return res.status(400).send("ID do funcionário inválido.");
  }

  usuarioModel
    .buscarFuncionarioPorId(idUsuario)
    .then((funcionario) => {
      if (!funcionario) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }
      res.status(200).json(funcionario);
    })
    .catch((erro) => {
      console.error("Erro ao buscar os dados do funcionário:", erro);
      res.status(500).json({ error: "Erro ao buscar os dados do funcionário." });
    });
}

function editarFuncionario(req, res) {
  const idUsuario = req.params.id;
  const { nomeServer, sobrenomeServer, emailServer, cargoServer } = req.body;

  if (!idUsuario || isNaN(idUsuario)) {
    return res.status(400).send("ID do funcionário inválido.");
  }

  if (!nomeServer || !sobrenomeServer || !emailServer || !cargoServer) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  usuarioModel
    .editarFuncionario(idUsuario, nomeServer, sobrenomeServer, emailServer, cargoServer)
    .then((resultado) => {
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }
      res.status(200).send("Funcionário atualizado com sucesso.");
    })
    .catch((erro) => {
      console.error("Erro ao atualizar o funcionário:", erro);
      res.status(500).json({ error: "Erro ao atualizar o funcionário." });
    });
}



module.exports = {
  autenticar,
  cadastrar,
  cadastrarFuncionario,
  verificarCadastro,
  buscarFuncionarios,
  editarFuncionario,
  obterTipoInstituicao,
  excluirFuncionario,
  atualizarProjecaoRepelente,
  atualizarProjecaoTestes,
  buscarDemanda,
  buscarEstadoEmpresa,
  obterFuncionario
};
