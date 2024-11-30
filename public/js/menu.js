function loadMenu() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../menu/style.css';
  document.head.appendChild(link);

  fetch('../menu/index.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu-container').innerHTML = data;
      initializeMenuBehavior();
      setupDashboardLink();
    })
    .catch(error => console.error('Error loading menu:', error));
}

function initializeMenuBehavior() {
  const body = document.querySelector('body');
  const sidebar = document.querySelector('.sidebar');
  let btn = document.querySelector('#btn');
  btn.onclick = function () {
    sidebar.classList.toggle('active');
  };
 
}

function setupDashboardLink() {
  const dashboardLink = document.getElementById("dashboard-link");
  if (dashboardLink) {
    dashboardLink.addEventListener("click", function (event) {
      event.preventDefault();
      redirecionaMenu();
    });
  }
}

function redirecionaMenu() {
  console.log("Redirecionando para a página de Dashboard...");

  obterTipoInstituicao().then(tipoInstituicao => {
    console.log("Tipo de Instituição obtido:", tipoInstituicao);
    if (tipoInstituicao === "Local" || tipoInstituicao === "Rede") {
      window.location = "../dash/index.html";
    } else {
      window.location = "../dashBoard.html";
    }
  }).catch(function (erro) {
    console.error("Erro ao redirecionar:", erro);
    window.location = "login.html";
  });
}

function obterTipoInstituicao() {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  console.log("ID_EMPRESA encontrado:", idEmpresa);

  if (!idEmpresa) {
    console.error("ID_EMPRESA não encontrado.");
    return Promise.reject("Usuário não logado.");
  }

  return fetch(`/usuarios/tipoInstituicao/${idEmpresa}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("Resposta da API:", resposta);
    if (resposta.ok) {
      return resposta.json().then(json => {
        console.log("Tipo de Instituição:", json.tipoInstituicao);
        return json.tipoInstituicao;
      });
    } else {
      console.log("Erro ao obter tipoInstituicao.");
      return resposta.text().then(texto => {
        console.error(texto);
        return null;
      });
    }
  }).catch(function (erro) {
    console.log("Erro na requisição:", erro);
    return null;
  });
}

document.addEventListener('DOMContentLoaded', loadMenu);
