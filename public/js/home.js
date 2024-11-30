const calendar = document.querySelector("#calendarModal")
loadPieChart()
loadLineCountryChart()
loadLineStateChart()
loadLineincidenceChart()

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
      
      console.log("Ano Inicial:", anoInicial);
      console.log("Ano Final:", anoFinal);
      console.log("Estado:", estado);


      modal.style.display = "none";
    });
});



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

function loadLineCountryChart() {
  Chart.defaults.color = "#193D65";
  Chart.defaults.font.size = 20;

  const labels = ['2021', '2022', '2023', '2024'];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Casos de Dengue',
      data: [90, 70, 50, 85],  
      backgroundColor: '#193D65',  
      borderColor: '#193D65',     
      borderWidth: 1              
    }]
  };

  const config = {
    type: 'bar', 
    data: data,
    options: {
      plugins: {
        legend: {
          display: false, 
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 18
            }
          }
        },
        y: {
          beginAtZero: true,  
          ticks: {
            font: {
              size: 20 
            }
          }
        }
      }
    }
  };

  const barCountryChart = new Chart(
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
                      size: 14 
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
          label: 'Taxa de Incidência',
          data: [1000, 3000, 1500, 2500],
          fill: false,  
          borderColor: '#193D65', 
          tension: 0.1, 
          pointStyle: 'circle',  
          pointRadius: 7,  
          pointHoverRadius: 10,  
          pointBackgroundColor: '#193D65', 
          pointBorderWidth: 2, 
          borderWidth: 0,
        }]
      };
      
      const config = {
        type: 'line',
        data: data,
        options: {
          plugins: {
            legend: {
              display: false  // Oculta a legenda
            }
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14 
                }
              }
            },
            y: {
              beginAtZero: true, 
            }
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
    