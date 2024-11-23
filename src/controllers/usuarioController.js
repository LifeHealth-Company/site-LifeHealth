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

function editarFuncionario(req, res) {
  const idFuncionario = req.params.id;
  const nome = req.body.nomeServer;
  const sobrenome = req.body.sobrenomeServer;
  const cargo = req.body.cargoServer;
  const email = req.body.emailServer;

  if (!idFuncionario) {
    return res.status(400).send("ID do funcionário não fornecido!");
  }

  usuarioModel
    .editarFuncionario(idFuncionario, { nome, sobrenome, email, cargo })
    .then(function (resultado) {
      if (resultado.affectedRows === 0) {
        return res
          .status(404)
          .send("Funcionário não encontrado para o ID fornecido.");
      }
      res.status(200).send("Funcionário atualizado com sucesso!");
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao editar o funcionário! Erro: ",
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
    const { estadoServer, anoInicial, anoFinal } = req.body;

    if (!estadoServer || !anoInicial || !anoFinal) {
        res.status(400).send("Dados insuficientes!");
    } else {
        usuarioModel.buscarDemanda(estadoServer, anoInicial, anoFinal)
            .then((resultado) => {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(404).send("Nenhum dado encontrado para os parâmetros informados.");
                }
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
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
  buscarDemanda
};
