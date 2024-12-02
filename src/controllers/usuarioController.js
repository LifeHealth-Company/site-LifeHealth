var usuarioModel = require("../models/usuarioModel");
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
          idEmpresa: resultadoAutenticar[0].idEmpresa,
          nomeEmpresa: resultadoAutenticar[0].nomeEmpresa,
          idUsuario: resultadoAutenticar[0].idUsuario,
          nomeUsuario: resultadoAutenticar[0].nomeUsuario,
          sobrenomeUsuario: resultadoAutenticar[0].sobrenomeUsuario,
          cargoUsuario: resultadoAutenticar[0].cargoUsuario,
          fkEmpresa: resultadoAutenticar[0].fkEmpresa,
          emailUsuario: resultadoAutenticar[0].emailUsuario,
          tipoUsuario: resultadoAutenticar[0].tipoUsuario,
        });
      }
       else if (resultadoAutenticar.length === 0) {
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
function buscarCasosPorEstado(req, res) {
  const estado = req.params.estado;

  usuarioModel
    .buscarCasosPorEstado( estado)
    .then((estado) => {
      if (!estado) {
        return res.status(404).json({ error: "Ano não encontrado." });
      }
      res.status(200).json(estado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar os dados do ano:", erro);
      res.status(500).json({ error: "Erro ao buscar os dados do ano." });
    });
}
function buscarCasosCurados(req, res) {
  const estado = req.params.estado;
  usuarioModel
    .buscarCasosCurados( estado)
    .then((estado) => {
      if (!estado) {
        return res.status(404).json({ error: "Ano não encontrado." });
      }
      res.status(200).json(estado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar os dados do ano:", erro);
      res.status(500).json({ error: "Erro ao buscar os dados do ano." });
    });
}
function buscarPopulacao(req, res) {
  const estado = req.params.estado;
  usuarioModel
    .buscarPopulacao(estado)
    .then((estado) => {
      if (!estado) {
        return res.status(404).json({ error: "Ano não encontrado." });
      }
      res.status(200).json(estado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar os dados do ano:", erro);
      res.status(500).json({ error: "Erro ao buscar os dados do ano." });
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

// --------------------Estrutura de tratativa da Home-------------------------------------------------------------------------------------

function atualizarGraficoRegioes() {
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
function carregarTaxaDeIncidencia(req, res) {
  const { anos, estado } = req.body;

  if (!anos || anos.length === 0) {
    return res.status(400).send("Os anos são obrigatórios.");
  }

  usuarioModel.carregarTaxaDeIncidencia(anos, estado)
    .then(function (resultados) {
      if (resultados.length > 0) {
        const taxasDeIncidencia = resultados.map((registro) => ({
          ano: registro.ano,
          estado: registro.estadoNotificacao,
          casos: registro.total_casos,
          populacao: registro.total_populacao,
          taxa_incidencia: registro.taxa_incidencia,
        }));

        res.json(taxasDeIncidencia);
      } else {
        res.status(404).send("Nenhum dado de taxa de incidência encontrado.");
      }
    })
    .catch(function (erro) {
      console.error(erro);
      res.status(500).send("Erro ao buscar dados de taxa de incidência.");
    });
}
function carregarCasosPorEstado(req, res) {
  const { anoInicial, anoFinal } = req.body;

  if (!anoInicial || !anoFinal) {
    return res.status(400).send("Os anos de início e fim são obrigatórios.");
  }

  usuarioModel.carregarCasosPorEstado(anoInicial, anoFinal)
    .then(function (resultados) {
      if (resultados.length > 0) {
        const casosPorEstado = resultados.map((registro) => ({
          estadoNotificacao: registro.estadoNotificacao,
          casos: registro.casos,
        }));

        res.json(casosPorEstado);
      } else {
        res.status(404).send("Nenhum dado de casos de Dengue encontrado para o período selecionado.");
      }
    })
    .catch(function (erro) {
      console.error(erro);
      res.status(500).send("Erro ao buscar dados de casos de Dengue.");
    });
}

function carregarCasosPorAno(req, res) {
  const anos = req.body.anos;

  if (!anos || anos.length === 0) {
    return res.status(400).send("Nenhum ano foi informado.");
  }

  usuarioModel.carregarCasosPorAno(anos)
    .then(function (resultados) {
      if (resultados.length > 0) {
        const casosPorAno = anos.map((ano) => {
          return {
            ano: ano,
            casos: resultados.filter((registro) => registro.ano === ano)
              .reduce((acc, cur) => acc + cur.casos, 0)
          };
        });
        res.json(casosPorAno);
      } else {
        res.status(404).send("Nenhum dado encontrado para os casos.");
      }
    })
    .catch(function (erro) {
      console.error(erro);
      res.status(500).send("Erro ao buscar dados de casos por ano.");
    });
}

function carregarCasosPorRegiao(req, res) {
  const { anoInicial, anoFinal } = req.body;

  if (!anoInicial || !anoFinal) {
    return res.status(400).send("Os anos de início e fim são obrigatórios.");
  }

  usuarioModel.carregarCasosPorRegiao(anoInicial, anoFinal)
    .then(function (resultados) {
      if (resultados.length > 0) {
        const casosPorRegiao = resultados.map((registro) => ({
          estadoNotificacao: registro.estadoNotificacao,
          quantidadeCasos: registro.quantidadeCasos,
        }));

        res.json(casosPorRegiao);
      } else {
        res.status(404).send("Nenhum dado de casos de Dengue encontrado para o período selecionado.");
      }
    })
    .catch(function (erro) {
      console.error(erro);
      res.status(500).send("Erro ao buscar dados de casos de Dengue.");
    });
}


function buscarMediaCasosPorAno(req, res) {
  const { anos } = req.body;

  if (!anos || anos.length === 0) {
    return res.status(400).send("Os anos são obrigatórios.");
  }

  usuarioModel.buscarMediaCasosPorAno(anos)
    .then(function (resultados) {
      if (resultados.length > 0) {
        res.json(resultados);
      } else {
        res.status(404).send("Nenhum dado de média de casos encontrado.");
      }
    })
    .catch(function (erro) {
      console.error(erro);
      res.status(500).send("Erro ao buscar dados de média de casos.");
    });
}

function buscarTaxaMortalidade(req, res) {
  const { anos } = req.body;

  if (!anos || anos.length === 0) {
    return res.status(400).send("Os anos são obrigatórios.");
  }

  usuarioModel.buscarTaxaMortalidade(anos)
    .then(function (resultados) {
      if (resultados.length > 0) {
        res.json(resultados);
      } else {
        res.status(404).send("Nenhum dado de taxa de mortalidade encontrado.");
      }
    })
    .catch(function (erro) {
      console.error(erro);
      res.status(500).send("Erro ao buscar dados de taxa de mortalidade.");
    });
}

function estadosMaisAfetados(req, res) {
  const ano = req.query.ano;
  // Busca os estados mais afetados e o crescimento em paralelo
  Promise.all([
      usuarioModel.obterEstadosMaisAfetados(ano),
      usuarioModel.calcularCrescimentoEstados(ano)
  ])
  .then(([estadosAfetados, crescimentoEstados]) => {
      // Combina os dados de estados afetados e crescimento
      const resultado = estadosAfetados.map(estado => {
          const crescimento = crescimentoEstados.find(c => c.estado === estado.estado);
          return {
              ...estado,
              crescimento: crescimento ? crescimento.crescimento : 0 // Se não houver dados de crescimento, define como 0
          };
      });
      res.json(resultado);
  })
  .catch(erro => {
      console.error("Erro ao buscar estados mais afetados:", erro);
      res.status(500).send("Erro ao buscar estados mais afetados.");
  });
}
function obterTotalCasosBrasil(req, res) {
usuarioModel.obterTotalCasosBrasil()
  .then(function (resultado) {
    res.json(resultado);
  })
  .catch(function (erro) {
    console.error(erro);
    res.status(500).send("Erro ao buscar total de casos no Brasil.");
  });
}
function crescimentoCasosBrasil(anoAnterior, anoAtual, res) {
usuarioModel.crescimentoCasosBrasil(anoAnterior, anoAtual)
  .then(function (resultado) {
    res.json(resultado);
  })
  .catch(function (erro) {
    console.error(erro);
    res.status(500).send("Erro ao calcular crescimento de casos no Brasil.");
  });
}
function obterMaioresAfetados(req, res) {
usuarioModel.maioresAfetados()
  .then(function (resultado) {
    res.json(resultado);
  })
  .catch(function (erro) {
    console.error(erro);
    res.status(500).send("Erro ao buscar maiores afetados.");
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
  buscarCasosPorEstado,
  buscarCasosCurados,
  buscarPopulacao,
  obterFuncionario,
  atualizarGraficoRegioes,
  carregarTaxaDeIncidencia,
  carregarCasosPorEstado,
  carregarCasosPorAno,
  carregarCasosPorRegiao,
  buscarMediaCasosPorAno,
  buscarTaxaMortalidade,
  obterTotalCasosBrasil,
  crescimentoCasosBrasil,
  obterMaioresAfetados,
  estadosMaisAfetados
};