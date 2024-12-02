const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

let caminho_env = '.env.dev';
require("dotenv").config({ path: caminho_env });

let LOCAL_PORT = process.env.APP_PORT;
let LOCAL_HOST = process.env.DB_HOST || "localhost";

let DOCKER_HOST = process.env.APP_HOST;
let DOCKER_PORT = process.env.APP_PORT;

let app = express();

let indexRouter = require("./src/routes/index");
let usuarioRouter = require("./src/routes/usuarios");
let avisosRouter = require("./src/routes/avisos");
let empresasRouter = require("./src/routes/empresas");

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/empresas", empresasRouter);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lifehealthcomp@gmail.com',
    pass: 'tsyd wrca lsbe eome'
  }
});

app.post('/send-verification-email', (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');

  const mailOptions = {
    from: 'lifehealthcomp@gmail.com',
    to: email,
    subject: 'Token de Redefinição de Senha',
    text: `Your password reset token is: ${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Token de ');
  });
});


app.listen(LOCAL_PORT, function () {
  console.log(`
              
  Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${LOCAL_HOST}:${LOCAL_PORT} :. \n\n
  Caso esteja acessando pelo ambiente da nuvem, acesse o caminho : http://${DOCKER_HOST}:${DOCKER_PORT} :. \n\n
  Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:`);
});