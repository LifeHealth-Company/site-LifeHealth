
loadPieChart()
loadLineCountryChart()
loadLineStateChart()


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

function loadLineStateChart(){
    Chart.defaults.color = "#193D65";
    Chart.defaults.font.size = 20;
    
    const labels = [
        '2021/1',
        '2021/2',
        '2022/1',
        '2022/2',
        '2023/1',
        '2023/2',
        '2024/1',
        '2024/2',
        ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 50, 41, 56, 55, 42],
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
function loadLineCountryChart(){
    Chart.defaults.color = "#193D65";
    Chart.defaults.font.size = 20;
    Chart.defaults.plugins.legend.position = 'right';
    
    const labels = [
        '2021/1',
        '2021/2',
        '2022/1',
        '2022/2',
        '2023/1',
        '2023/2',
        '2024/1',
        '2024/2',
        ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 50, 41, 56, 55, 42],
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
                      size: 14 // define o tamanho da fonte para as labels do eixo x
                    }
                  }
                },
            }
          }
    };
    
    const lineCountryChart = new Chart(
        document.getElementById('state'),
        config
    );
}