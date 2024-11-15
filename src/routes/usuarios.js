var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarFuncionario", function(req, res){
    usuarioController.cadastrarFuncionario(req,res);
})

router.post("/verificarCadastro", function (req, res) {
    usuarioController.verificarCadastro(req, res);
});


router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/editarFuncionario/:id", function (req, res) {
    usuarioController.editarFuncionario(req, res);
});

router.delete("/excluirFuncionario/:id"), function (req, res) {
    usuarioController.excluirFuncionario(req, res);
}

router.get('/nomeUsuario', function(req, res) {
    usuarioController.nomeUsuario(req, res);
});

router.get('/buscarFuncionarios', function(req, res) {
    usuarioController.buscarFuncionarios(req, res);
});

router.get("/tipoInstituicao/:idEmpresa", function (req, res) {
    usuarioController.obterTipoInstituicao(req, res);
});


module.exports = router;