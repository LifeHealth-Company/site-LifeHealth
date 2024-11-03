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

    usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

            if (resultadoAutenticar.length === 1) {
                // Login bem-sucedido
                res.json({
                    id: resultadoAutenticar[0].id,
                    email: resultadoAutenticar[0].email,
                    nome: resultadoAutenticar[0].nome,
                });
            } else if (resultadoAutenticar.length === 0) {
                // Nenhum usuário encontrado
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                // Mais de um usuário com o mesmo login e senha
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).send("Houve um erro ao realizar o login. Tente novamente mais tarde.");
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
      usuarioModel.cadastrar(nomeInstituicao, nomeResponsavel, email, senha, estado, cnpj, cep, tipoInstituicao)
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

    // Verifica se os campos foram enviados
    if (!email || !cnpj) {
        return res.status(400).send("E-mail e/ou CNPJ não foram fornecidos.");
    }

    // Chama o modelo para verificar se o cadastro já existe
    usuarioModel.verificarCadastro(email, cnpj)
        .then(resultado => {
            if (resultado.existe) {
                res.status(200).json({ existe: true });
            } else {
                res.status(200).json({ existe: false });
            }
        })
        .catch(erro => {
            console.error("Erro ao verificar cadastro:", erro);
            res.status(500).json({ error: "Erro ao verificar cadastro" });
        });
}

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = 1;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarFuncionario(nome, sobrenome, cargo, email, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar, 
    cadastrarFuncionario,
    verificarCadastro
}