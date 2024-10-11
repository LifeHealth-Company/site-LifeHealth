     // Gráfico de infectados por tipo de vírus
     const dataRadar = { 
        labels: ['Não identificado', 'Denv 1', 'Denv 2', 'Denv 3', 'Denv 4'], 
        datasets: [{ 
            data: [0, 25, 50, 75, 100], 
            borderColor: '#193D65', 
            borderWidth: 2
        }] 
    }; 

    const configRadar = { 
        type: 'radar', 
        data: dataRadar, 
        options: { 
            scales: { 
                r: { 
                    ticks: { 
                        stepSize: 25,
                        beginAtZero: true,
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }, 
                    grid: { 
                        circular: true
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                } 
            }, 
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Tipo Vírus',
                    color: '#193D65',
                    font: {
                        size: 25,
                        weight: 'bold'
                    },
                    padding: {
                        top: 20,
                        bottom: 5 
                    }
                }
            }, 
            interaction: { 
                intersect: false 
            } 
        }
    }; 

    const ctxRadar = document.getElementById('myRadarChart').getContext('2d'); 
    const meuGraficoRadar = new Chart(ctxRadar, configRadar); 

    // Gráfico gauge da porcentagem da população que foi infectada
    window.onload = function() {
        var g = new JustGage({
            id: "gauge",
            value: 0,
            min: 0,
            max: 100,
            pointer: true,
            pointerOptions: {
                toplength: 15,
                bottomlength: 8,
                bottomwidth: 10,
                color: '#273380',
                stroke: '#ffffff',
                stroke_width: 3,
                stroke_linecap: 'square'
            },
            valueFontColor: "#000000",
            titleFontColor: "#FF0000",
            labelFontColor: "#000000",
            gaugeColor: "#FFFFFF",
            levelColors: ["#FF0000", "#FFFF00", "#00FF00"],
            gaugeWidthScale: 0.8,
            customSectors: [
                { color: "#FF0000", lo: 0, hi: 33 },
                { color: "#FFFF00", lo: 34, hi: 66 },
                { color: "#00FF00", lo: 67, hi: 100 }
            ]
        });

        // Função para atualizar o valor aleatoriamente
        setInterval(function() {
            var randomValue = Math.floor(Math.random() * 101);
            g.refresh(randomValue); 
        }, 2000);
    };

    // Gráfico pizza
    const dataPizza = {
        labels: ['Confirmados', 'Não Confirmados'],
        datasets: [{
            label: 'Casos confirmados',
            data: [300, 50],
            backgroundColor: ['#327BCB', '#273380'],
            hoverOffset: 4
        }]
    };

    const configPizza = {
        type: 'pie',
        data: dataPizza,
        options: { 
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Casos confirmados',
                    color: '#193D65',
                    font: {
                        size: 25,
                        weight: 'bold'
                    },
                    padding: {
                        top: 20,
                        bottom: 5 
                    }
                }
            }, 
            interaction: { 
                intersect: false 
            } 
        }
    };
    const ctxPizza = document.getElementById('pizzaGraphic').getContext('2d'); 
    const meuGraficoPizza = new Chart(ctxPizza, configPizza); 

//  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Grafico casos por idade
    const dataBarra = {
        labels: ['1-12 anos','12-35 anos','35-60 anos','60+ anos'],
        datasets: [{
            data: [7,5,1.5,5.9],
            backgroundColor: ['#327BCB', '#273380'],
            hoverOffset: 4
        }]
    };

    const configBarra= {
        type: 'bar',
        data: dataBarra,
        options: {
          responsive: true,
          scales: {
            y: {
                beginAtZero: true,
                max: 7,
                ticks: {
                    callback: function(value) {
                        return value + ' milhões'; // Formato personalizado dos rótulos
                    }
                }
            }
            },
          plugins: {
            legend:false,
            title: {
              display: true,
              text: 'Casos por idade',
              color: '#193D65',
              font: {
                  size: 40,
                  weight: 'bold'
              },
              padding: {
                  top: 20,
                  bottom: 30
              },
              align: 'start'
            }
          }
        },
      };
    const ctxBarra = document.getElementById('graficoBarraBox').getContext('2d'); 
    const graficobarra = new Chart(ctxBarra, configBarra); 


    //Gráfico Casos por idade 
    const dataLinha = {
        labels: ['Casos'],
        datasets: [{
            label: 'Casos',
            data: [300, 50, 100, 200, 10, 50],
            backgroundColor: ['#327BCB'],
            hoverOffset: 4
        }]
    };

    const configLinha= {
        type: 'line',
        data: dataLinha,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Número de casos',
                    color: '#193D65',
                    font: {
                        size: 25,
                        weight: 'bold'
                    },
                    padding: {
                        top: 20,
                        bottom: 5 
                    }
            }
          }
        },
      };
    const ctxLinha = document.getElementById('graficoLinhaBox').getContext('2d'); 
    const graficoLinha = new Chart(ctxLinha, configLinha); 
