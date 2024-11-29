const modal = document.querySelector('#modal')

function openCalendar(){
  modal.showModal()
}

function modalClose(){
  modal.close()
}


let dados2021 = []
let dados2022 = []
let dados2023 = []
let dados2024 = []
let dados2025 = []

let dadosCura2021 = []
let dadosCura2022 = []
let dadosCura2023 = []


fetch(`/usuarios/buscarCasosPorEstado/${"São Paulo"}`, {
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
      let anos = [2021, 2022, 2023]
      let casos = [dados2021.length, dados2022.length, dados2023.length]



      const regressao = calcularRegressaoLinear(anos, casos)

      const casos2024 = calcularProjecao(2024, regressao);
      dados2024.push(casos2024);

      const casos2025 = calcularProjecao(2025, regressao);
      dados2025.push(casos2025);

      console.log(regressao)
      loadLineForecastOfIncreaseInCasesChart()
      loadLinePredictedSerumUseChart()
      loadLineBedEstimateForNextYearChart();
    }
  })
  .catch((erro) => console.error("Erro na requisição:", erro));

fetch(`/usuarios/buscarCasosCurados/${"São Paulo"}`, {
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
      console.log(dados)
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
      loadLinePercentageOfBedOccupancyInRelationToTheLastYearChart()
    }
  })
  .catch((erro) => console.error("Erro na requisição:", erro));

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
      borderColor: '#193D65',
      tension: 0.1,
      backgroundColor: [
        '#193D65',
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

  const lineforecastOfIncreaseInCasesChart = new Chart(
    document.getElementById('forecastOfIncreaseInCases'),
    config
  );
}
function loadLinePredictedSerumUseChart() {
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';

  let bolsas2021 = (dados2021.length * 0.04) * 2
  let bolsas2022 = (dados2022.length * 0.04) * 2
  let bolsas2023 = (dados2023.length * 0.04) * 2
  let bolsas2024 = (dados2024 * 0.04) * 2
  let bolsas2025 = (dados2025 * 0.04) * 2

  console.log(dados2021.length)

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
      borderColor: '#193D65',
      tension: 0.1,
      backgroundColor: [
        '#193D65',
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

  const linePredictedSerumUseChart = new Chart(
    document.getElementById('PredictedSerumUse'),
    config
  );
}
function loadLineBedEstimateForNextYearChart() {
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

  const lineBedEstimateForNextYearChart = new Chart(
    document.getElementById('BedEstimateForNextYear'),
    config
  );
}


function loadLinePercentageOfBedOccupancyInRelationToTheLastYearChart() {
  console.log(dadosCura2021)
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
      data: [dadosCura2021,dadosCura2022, dadosCura2023],
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

  const linePercentageOfBedOccupancyInRelationToTheLastYearChart = new Chart(
    document.getElementById('PercentageOfBedOccupancyInRelationToTheLastYear'),
    config
  );
}

function atualizarKPI(estadoVar) {
  const estadoElement = document.getElementById("modalEstado");
  const anoInicialElement = document.getElementById("modalAnoInicial");
  const anoFinalElement = document.getElementById("modalAnoFinal");

  if (!estadoElement || !anoInicialElement || !anoFinalElement) {
    console.error("Um ou mais elementos do modal não foram encontrados!");
    return;
  }

  const estado = estadoElement.value;
  const anoInicial = anoInicialElement.value || "2022";
  const anoFinal = anoFinalElement.value || "2023";

  console.log("Dados a serem enviados:", {
    estadoServer: estado,
    anoInicialServer: anoInicial,
    anoFinalServer: anoFinal,
  });

  fetch(`/usuarios/demanda`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estadoServer: estado,
      anoInicialServer: anoInicial,
      anoFinalServer: anoFinal,
    }),
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
        console.log("Dados recebidos:", dados);

        const mediaDemandaRepelente = calcularMediaDemandaRepelente(dados);
        const percentualEvolucaoRepelente = calcularPercentualEvolucaoRepelente(dados);

        const mediaDemandaSoro = calcularMediaDemanda(dados);
        const percentualEvolucaoSoro = calcularPercentualEvolucao(dados);

        atualizarKPIRepelente(mediaDemandaRepelente, percentualEvolucaoRepelente);
        atualizarKPICard(mediaDemandaSoro, percentualEvolucaoSoro);
      }
    })
    .catch((erro) => console.error("Erro na requisição:", erro));
}