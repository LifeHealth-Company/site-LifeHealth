const calendar = document.querySelector("#calendarModal")
loadPieChart()
loadLineCountryChart()
loadLineStateChart()
loadLineincidenceChart()


function loadPieChart(){

    Chart.defaults.color = "#193D65";
    Chart.defaults.font.size = 20;
    Chart.defaults.plugins.legend.position = 'right';
    const data = {
           datasets: [{
            label: 'Porcentagem de casos',
            data: [7.5, 7.5, 20, 30, 35],
            backgroundColor: [
                '#FF6D01',
                '#34A853',
                '#FBBC04',
                '#8D34F9',
                '#C01333',
            ]
        }],
        labels: ['Centro Oeste', 'Norte', 'Sul', "Nordeste", "Sudeste"],
    };

    const config = {
        type: 'pie',
        data: data, 
  
       
    };
    
    const pieChart = new Chart(
        document.getElementById('regions'),
        config
    );
}

function loadLineCountryChart(){
    Chart.defaults.color = "#193D65";
    Chart.defaults.font.size = 20;
    
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
        data: [90,70,50,85],
        fill: false,
        borderColor: '#193D65',
        tension: 0.1
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
                      size: 20 // define o tamanho da fonte para as labels do eixo x
                    }
                  }
                },
            }
          }
    };
    
    const lineCountryChart = new Chart(
        document.getElementById('country'),
        config
    );
}
function loadLineStateChart(){
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
        data: [20, 15, 7, 18],
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
    
    const lineStateChart = new Chart(
        document.getElementById('state'),
        config
    );
}

function loadLineincidenceChart(){
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
  
  const lineincidenceChart = new Chart(
      document.getElementById('incidence'),
      config
  );
}

function openCalendar(){
  calendar.showModal();
}
    
function closeModal(){
  calendar.close();
}
    
incidence