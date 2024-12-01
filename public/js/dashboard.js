let dados2021 = []
let dados2022 = []
let dados2023 = []
let dados2024 = []
let dados2025 = []

let dadosCura2021 = []
let dadosCura2022 = []
let dadosCura2023 = []
let searchState = false
const modal = document.querySelector('#modal')
const valorIncidencia = document.querySelector('#valorIncidencia')
const valorCrescimento = document.querySelector('#valorCrescimento')
const valorCrescimentoCura = document.querySelector('#valorCrescimentoCura')
const valorCasos = document.querySelector('#valorCasos')
const curaIcon = document.querySelector('#curaIcon')
const casosIcon = document.querySelector('#casosIcon')
const crescimentoIcon = document.querySelector('#crescimentoIcon')
const state = document.querySelector('#state')

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const searchBtn = document.getElementById("search-btn");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  searchBtn.addEventListener("click", () => {
    const anoInicial = document.getElementById("modalAnoInicial").value;
    const anoFinal = document.getElementById("modalAnoFinal").value;
    const estado = document.getElementById("modalEstado").value;

    if (parseInt(anoFinal) <= parseInt(anoInicial)) {
      alert("O ano final não pode ser igual ou menor que o ano inicial.");
      return;
    }

    document.getElementById("start-date").textContent = anoInicial;
    document.getElementById("end-date").textContent = anoFinal;
    buscarCasos(estado)
    searchState = true
    buscarPopulacao(parseInt(anoInicial), parseInt(anoFinal), estado);
    buscarCasosCurados(parseInt(anoInicial), parseInt(anoFinal), estado);
    calcularDiferencaSoro(parseInt(anoInicial), parseInt(anoFinal));

    modal.style.display = "none";
  });
});

let lineforecastOfIncreaseInCasesChart;
let linePredictedSerumUseChart;
let lineBedEstimateForNextYearChart;
let linePercentageOfBedOccupancyInRelationToTheLastYearChart;



buscarEstadoEmpresa()
function buscarEstadoEmpresa() {
  const idEmpresa = sessionStorage.ID_EMPRESA;

  if (!idEmpresa || isNaN(idEmpresa)) {
    console.error("ID da empresa não definido ou inválido.");
    alert("Erro: ID da empresa não encontrado. Por favor, faça login novamente.");
    carregarEstadoNaInterface("BRASIL");
    return;
  }

  document.querySelector("#search-btn").addEventListener("click", () => {
    const estadoSelecionadoSigla = document.querySelector("#modalEstado").value;
    const estadoCompleto = traduzirSiglaParaNome(estadoSelecionadoSigla);
    sessionStorage.setItem("estadoAtual", estadoSelecionadoSigla);
    carregarEstadoNaInterface(estadoCompleto);
    atualizarProjecaoSoro(estadoSelecionadoSigla);
    atualizarPrevisaoDemandaParacetamol(estadoSelecionadoSigla)

  });

  fetch(`/usuarios/${idEmpresa}`)
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        throw "Erro ao buscar os dados da empresa.";
      }
    })
    .then((dadosEmpresa) => {
      const estados = {
        "AL": "Alagoas",
        "AC": "Acre",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MG": "Minas Gerais",
        "SP": "São Paulo",
        "RS": "Rio Grande do Sul",
        "SC": "Santa Catarina",
        "SE": "Sergipe",
        "TO": "Tocantins",
        "MT": "Mato Grosso",
        "PE": "Pernambuco",
        "MS": "Mato Grosso do Sul",
        "PA": "Pará",
        "PR": "Paraná",
        "PI": "Piauí",
        "PB": "Paraíba"
      };

      const estadoSigla = dadosEmpresa[0]?.estado || "BRASIL";
      const estadoCompleto = estados[estadoSigla] || estadoSigla;

      const selectEstado = document.querySelector("#modalEstado");
      const options = selectEstado.querySelectorAll("option");

      options.forEach(option => {
        if (option.value === estadoSigla) {
          option.selected = true;
        }
      });
      buscarCasos(estadoCompleto)
      state.textContent = estadoCompleto
    })
    .catch((erro) => {
      console.error("#ERRO:", erro);
      carregarEstadoNaInterface("BRASIL");
    });
}
function buscarCasos(Estado) {
  fetch(`/usuarios/buscarCasosPorEstado/${Estado}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        console.error("Erro ao buscar dados da demanda.");
        return null;
      }
    })
    .then((dados) => {
      if (dados) {
        if (dados2021.length === 0 && dados2022.length === 0 && dados2023.length === 0) {
          for (let i = 0; i < dados.length; i++) {
            switch (dados[i].ano) {
              case "2021":
                dados2021.push(dados[i])
                break;
              case "2022":
                dados2022.push(dados[i])
                break;
              case "2023":
                dados2023.push(dados[i])
                break;
            }
          }
        }

        let anos = [2021, 2022, 2023]
        let casos = [dados2021.length, dados2022.length, dados2023.length]



        const regressao = calcularRegressaoLinear(anos, casos)

        const casos2024 = calcularProjecao(2024, regressao);
        dados2024.push(casos2024);

        const casos2025 = calcularProjecao(2025, regressao);
        dados2025.push(casos2025);

        loadLineForecastOfIncreaseInCasesChart()
        loadLinePredictedSerumUseChart()
        loadLineBedEstimateForNextYearChart();

        if (!searchState) {
          buscarPopulacao(2021, 2023, "São Paulo")
          buscarCasosCurados(2021, 2023, "São Paulo")
          calcularDiferencaSoro(2021, 2023)
        }
      }
    })
    .catch((erro) => console.error("Erro na requisição:", erro));
}

function buscarPopulacao(dataInicial, dataFinal, estado) {
  let incidencia = 0
  let incidenciaInicial = 0
  let incidenciaFinal = 0
  fetch(`/usuarios/buscarPopulacao/${estado}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((response) => {
    if (response) {
      return response.json()
    } else {
      console.error("Erro ao buscar dados da demanda.");
      return null;
    }
  }).then((dados) => {
    incidenciaInicial = ((dados2021.length / dados[0].qtdPopulacao) * 100000).toFixed(3)
    switch (dataInicial) {
      case 2021:
        incidenciaInicial = ((dados2021.length / dados[0].qtdPopulacao) * 100000).toFixed(3)
        break;
      case 2022:
        incidenciaInicial = ((dados2022.length / dados[0].qtdPopulacao) * 100000).toFixed(3)
        break;
    }

    switch (dataFinal) {
      case 2021:
        incidencia = ((dados2021.length / dados[0].qtdPopulacao) * 100000).toFixed(3)
        break;
      case 2022:
        incidencia = ((dados2022.length / dados[1].qtdPopulacao) * 100000).toFixed(3)
        incidenciaFinal = ((dados2022.length / dados[0].qtdPopulacao) * 100000).toFixed(3)
        break;
      case 2023:
        incidencia = ((dados2023.length / dados[2].qtdPopulacao) * 100000).toFixed(3)
        incidenciaFinal = ((dados2023.length / dados[1].qtdPopulacao) * 100000).toFixed(3)
        break;
    }

    valorIncidencia.textContent = incidencia
    if (calcularDiferencaPercentual(incidenciaInicial, incidenciaFinal) < 0
    ) {
      valorCrescimento.classList.add("positive")
      crescimentoIcon.src = "./assets/icon/arrowDown.svg"
    }
    valorCrescimento.textContent = `${calcularDiferencaPercentual(incidenciaInicial, incidenciaFinal)}%`
  })
}

function calcularDiferencaPercentual(valorInicial, valorFinal) {
  let diferenca = valorFinal - valorInicial
  let variacaoRelativa = diferenca / valorInicial
  let percentual = variacaoRelativa * 100

  return `${percentual.toFixed(2)}`
}

function buscarCasosCurados(dataInicial, dataFinal, estado) {
  let valorInicial = 0
  let valorFinal = 0
  fetch(`/usuarios/buscarCasosCurados/${estado}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        console.error("Erro ao buscar dados da demanda.");
        return null;
      }
    })
    .then((dados) => {
      if (dados) {
        for (let i = 0; i < dados.length; i++) {
          switch (dados[i].ano) {
            case "2021":
              dadosCura2021.push(dados[i].cura)
              break;
            case "2022":
              dadosCura2022.push(dados[i].cura)
              break;
            case "2023":
              dadosCura2023.push(dados[i].cura)
              break;

          }
        }

        switch (dataInicial) {
          case 2021:
            valorInicial = (dadosCura2021[0] / dados2021.length) * 100

            break;
          case 2022:
            valorInicial = (dadosCura2022[0] / dados2022.length) * 100
            break;
        }

        switch (dataFinal) {
          case 2022:
            valorFinal = (dadosCura2022[0] / dados2022.length) * 100
            break;
          case 2023:
            valorFinal = (dadosCura2023[0] / dados2023.length) * 100
            break;
        }
        diferenca = valorFinal - valorInicial

        curaIcon.src = "./assets/icon/positiveUp.svg"
        valorCrescimentoCura.classList.add('positive')
        if (diferenca < 0) {
          curaIcon.src = "./assets/icon/negativeDown.svg"
          valorCrescimentoCura.classList.remove('positive')
        }
        valorCrescimentoCura.textContent = `${diferenca.toFixed(2)}%`
        loadLinePercentageOfBedOccupancyInRelationToTheLastYearChart()
      }
    })
    .catch((erro) => console.error("Erro na requisição:", erro));

}
function calcularDiferencaSoro(dataInicial, dataFinal) {
  let valorInicial = 0
  let valorFinal = 0

  let bolsas2021 = (dados2021.length * 0.04) * 2
  let bolsas2022 = (dados2022.length * 0.04) * 2
  let bolsas2023 = (dados2023.length * 0.04) * 2

  switch (dataInicial) {
    case 2021:
      valorInicial = bolsas2021
      break;
    case 2022:
      valorInicial = bolsas2022
      break;
  }

  switch (dataFinal) {
    case 2022:
      valorFinal = bolsas2022
      break;
    case 2023:
      valorFinal = bolsas2023
      break;
  }
  valorCasos.textContent = `${calcularDiferencaPercentual(valorInicial, valorFinal)}%`

  if (calcularDiferencaPercentual(valorInicial, valorFinal) < 0) {
    valorCasos.classList.add('positive')
    casosIcon.src = "./assets/icon/arrowDown.svg"
  }
  valorCasos.textContent = `${calcularDiferencaPercentual(valorInicial, valorFinal)}%`
}

function calcularRegressaoLinear(anos, valores) {
  const n = anos.length;
  const mediaX = anos.reduce((soma, x) => soma + x, 0) / n;
  const mediaY = valores.reduce((soma, y) => soma + y, 0) / n;

  let numerador = 0;
  let denominador = 0;

  for (let i = 0; i < n; i++) {
    numerador += (anos[i] - mediaX) * (valores[i] - mediaY);
    denominador += Math.pow(anos[i] - mediaX, 2);
  }

  const m = numerador / denominador;
  const b = mediaY - m * mediaX;

  return { m, b };
}
function calcularProjecao(ano, regressao) {
  const projRegressao = Math.round(regressao.m * ano + regressao.b);
  return projRegressao;
}



function loadLineForecastOfIncreaseInCasesChart() {
  // if (lineforecastOfIncreaseInCasesChart) {
  //   lineforecastOfIncreaseInCasesChart.destroy();
  // }
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';


  const labels = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [dados2021.length, dados2022.length, dados2023.length, dados2024, dados2025],
      fill: false,
      borderColor: [
        '#193D65',
      ],
      tension: 0.1,
      backgroundColor: [
        '#193D65',
        '#8D34F9',
      ],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 14 // define o tamanho da fonte para as labels do eixo x
            }
          }
        },
      }
    }
  };

  lineforecastOfIncreaseInCasesChart = new Chart(
    document.getElementById('forecastOfIncreaseInCases'),
    config
  );
}
function loadLinePredictedSerumUseChart() {
  // if (linePredictedSerumUseChart) {
  //   linePredictedSerumUseChart.destroy();
  // }
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';


  let bolsas2021 = (dados2021.length * 0.04) * 2
  let bolsas2022 = (dados2022.length * 0.04) * 2
  let bolsas2023 = (dados2023.length * 0.04) * 2
  let bolsas2024 = (dados2024 * 0.04) * 2
  let bolsas2025 = (dados2025 * 0.04) * 2

  const labels = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [bolsas2021, bolsas2022, bolsas2023, bolsas2024, bolsas2025],
      fill: false,
      borderColor: [
        '#193D65',
      ],
      tension: 0.1,
      backgroundColor: [
        '#193D65',
        '#8D34F9',
      ],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 14 // define o tamanho da fonte para as labels do eixo x
            }
          }
        },
      }
    }
  };

  linePredictedSerumUseChart = new Chart(
    document.getElementById('PredictedSerumUse'),
    config
  );
}
function loadLineBedEstimateForNextYearChart() {
  // if (lineBedEstimateForNextYearChart) {
  //   lineBedEstimateForNextYearChart.destroy();
  // }
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';

  const labels = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [dados2021.length * .02, dados2022.length * .02, dados2023.length * .02, dados2024 * .02, dados2025 * .02],
      fill: false,
      borderColor: '#193D65',
      tension: 0.1,
      backgroundColor: [
        '#193D65',
        '#8D34F9',
      ],
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 14 // define o tamanho da fonte para as labels do eixo x
            }
          }
        },
      }
    }
  };

  lineBedEstimateForNextYearChart = new Chart(
    document.getElementById('BedEstimateForNextYear'),
    config
  );
}


function loadLinePercentageOfBedOccupancyInRelationToTheLastYearChart() {

  // if (linePercentageOfBedOccupancyInRelationToTheLastYearChart) {
  //   linePercentageOfBedOccupancyInRelationToTheLastYearChart.destroy();
  // }

  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';

  const labels = [
    '2021',
    '2022',
    '2023',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [dadosCura2021, dadosCura2022, dadosCura2023],
      fill: false,
      borderColor: '#193D65',
      tension: 0.1,
      backgroundColor: [
        '#193D65',

      ],
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 14 // define o tamanho da fonte para as labels do eixo x
            }
          }
        },
      }
    }
  };

  linePercentageOfBedOccupancyInRelationToTheLastYearChart = new Chart(
    document.getElementById('PercentageOfBedOccupancyInRelationToTheLastYear'),
    config
  );
}

function traduzirSiglaParaNome(sigla) {
  const estados = {
    AL: "(Alagoas)",
    AC: "(Acre)",
    AP: "(Amapá)",
    AM: "(Amazonas)",
    BA: "(Bahia)",
    CE: "(Ceará)",
    DF: "(Distrito Federal)",
    GO: "(Goiás)",
    MA: "(Maranhão)",
    MG: "(Minas Gerais)",
    SP: "(São Paulo)",
    RS: "(Rio Grande do Sul)",
    SC: "(Santa Catarina)",
    SE: "(Sergipe)",
    TO: "(Tocantins)",
    MT: "(Mato Grosso)",
    PE: "(Pernambuco)",
    MS: "(Mato Grosso do Sul)",
    PA: "(Pará)",
    PR: "(Paraná)",
    PI: "(Piauí)",
    PB: "(Paraíba)",
  };

  return estados[sigla] || sigla;
}
