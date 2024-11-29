let caminho_env = '.env.dev';
require("dotenv").config({ path: caminho_env });

<<<<<<< HEAD
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST || '0.0.0.0';
var NUVEM_APP = process.env.APP_NUVEM;
=======
let express = require("express");
let cors = require("cors");
let path = require("path");
>>>>>>> c6f2faf82d06ab5d828345d5403c8453fc7a7cb6

let LOCAL_PORT = process.env.APP_PORT;
let LOCAL_HOST = process.env.DB_HOST || "localhost";

let DOCKER_HOST = process.env.APP_HOST;
let DOCKER_PORT = process.env.APP_PORT;

let app = express();

let indexRouter = require("./src/routes/index");
let usuarioRouter = require("./src/routes/usuarios");
let avisosRouter = require("./src/routes/avisos");
let empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/empresas", empresasRouter);

app.listen(LOCAL_PORT, function () {
    console.log(`
              
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${LOCAL_HOST}:${LOCAL_PORT} :. \n\n
    Caso esteja acessando pelo ambiente da nuvem, acesse o caminho : http://${DOCKER_HOST}:${DOCKER_PORT} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:`);
});

