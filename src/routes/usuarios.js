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

router.delete("/excluirFuncionario/:idUsuario", function (req, res) {
    usuarioController.excluirFuncionario(req, res);
});


router.get('/nomeUsuario', function(req, res) {
    usuarioController.nomeUsuario(req, res);
});

router.get('/buscarFuncionarios', function(req, res) {
    usuarioController.buscarFuncionarios(req, res);
});

router.get("/tipoInstituicao/:idEmpresa", function (req, res) {
    usuarioController.obterTipoInstituicao(req, res);
});

router.post("/casos", function (req, res) {
    usuarioController.atualizarProjecaoRepelente(req, res);
})

router.post('/testes', function(req, res) {
    usuarioController.atualizarProjecaoTestes(req, res);
});

router.post("/demanda", function (req, res) {
    usuarioController.buscarDemanda(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    usuarioController.buscarEstadoEmpresa(req, res);
});
router.get("/buscarCasosPorEstado/:estado", function (req, res) {
    usuarioController.buscarCasosPorEstado(req, res);
});
router.get("/buscarCasosCurados/:estado", function (req, res) {
    usuarioController.buscarCasosCurados(req, res);
});
router.get("/buscarPopulacao/:estado", function (req, res) {
    usuarioController.buscarPopulacao(req, res);
});

router.get("/obterFuncionario/:id", function (req, res) {
    usuarioController.obterFuncionario(req, res);
  });

  router.put("/editarFuncionario/:id", function (req, res) {
    usuarioController.editarFuncionario(req, res);
  });

  router.post("/taxa-incidencia", function (req, res) {
    usuarioController.carregarTaxaDeIncidencia(req, res);
});

router.post("/casosPorEstado", function (req, res) {
    usuarioController.carregarCasosPorEstado(req, res);
  });
  
  router.post("/casosPorAno", function (req, res) {
    usuarioController.carregarCasosPorAno(req, res);
});

router.post("/casosPorRegiao", function (req, res) {
    usuarioController.carregarCasosPorRegiao(req, res);
  });

module.exports = router;