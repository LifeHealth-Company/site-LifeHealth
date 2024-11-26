loadLineForecastOfIncreaseInCasesChart()
loadLinePredictedSerumUseChart()
loadLinePercentageOfBedOccupancyInRelationToTheLastYearChart()
loadLineBedEstimateForNextYearChart()
function loadLineForecastOfIncreaseInCasesChart(){
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';
  
  const labels = [
      '2021',
      '2022',
      '2023',
      '2024',
      ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [1000, 3000, 1500, 2500],
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
function loadLinePredictedSerumUseChart(){
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';
  
  const labels = [
      '2021',
      '2022',
      '2023',
      '2024',
      ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [1000, 3000, 1500, 2500],
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
function loadLineBedEstimateForNextYearChart(){
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';
  
  const labels = [
      '2021',
      '2022',
      '2023',
      '2024',
      ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [1000, 3000, 1500, 2500],
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
function loadLinePercentageOfBedOccupancyInRelationToTheLastYearChart(){
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;
  Chart.defaults.plugins.legend.position = 'right';
  
  const labels = [
      '2021',
      '2022',
      '2023',
      '2024',
      ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [1000, 3000, 1500, 2500],
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