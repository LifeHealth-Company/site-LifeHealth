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

    document.getElementById("start-date").textContent = anoInicial;
    document.getElementById("end-date").textContent = anoFinal;
    
    console.log("Ano Inicial:", anoInicial);
    console.log("Ano Final:", anoFinal);
    console.log("Estado:", estado);

    atualizarKPI(anoInicial, anoFinal, estado);
    atualizarProjecaoRepelentes(estado);
    atualizarProjecaoTestes(estado);

    modal.style.display = "none";
  });
});





Chart.defaults.font.size = 40;

const ctx1 = document.getElementById("state1").getContext("2d");

new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Consumo em milhões",
        data: [7, 5, 3, 6],
        backgroundColor: ["#AA00FF", "#AA00FF", "#193D65", "#193D65"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} milhões`,
        },
        titleFont: {
          family: "Exo 2",
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          family: "Exo 2",
          size: 12,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Exo 2",
            size: 18,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#e0e0e0",
        },
        ticks: {
          callback: (value) => `${value} milhão${value > 1 ? "s" : ""}`,
          font: {
            family: "Exo 2",
            size: 18,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
    },
  },
});

const ctx3 = document.getElementById("state3").getContext("2d");

new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["2021", "2022", "2023", "2024", "2025"], 
    datasets: [
      {
        label: "Quantidade de testes vendidos registrados",
        data: [], 
        borderColor: "#193D65",
        backgroundColor: "rgba(25, 61, 101, 0.1)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Quantidade de vendas projetadas",
        data: [], 
        borderColor: "#FF0000",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        fill: false,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Exo 2",
            size: 20,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} milhões`,
        },
        titleFont: {
          family: "Exo 2",
          size: 20,
          weight: "bold",
        },
        bodyFont: {
          family: "Exo 2",
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Exo 2",
            size: 14,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} milhão${value > 1 ? "s" : ""}`,
          font: {
            family: "Exo 2",
            size: 20,
            weight: "semibold",
          },
          color: "#193D65",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  },
});


const ctx2 = document.getElementById("state2").getContext("2d");

new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "quantidade de bolsas de soro registradas",
        data: [2, 3, 4.5, 4, 2.5],
        borderColor: "#193D65",
        backgroundColor: "rgba(25, 61, 101, 0.1)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "quantidade de bolsas de soro projetadas",
        data: [2.5, 3, 3.5, 3.8, 4.5],
        borderColor: "#FF0000",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        fill: false,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Exo 2",
            size: 20,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} milhões`,
        },
        titleFont: {
          family: "Exo 2",
          size: 20,
          weight: "bold",
        },
        bodyFont: {
          family: "Exo 2",
          size: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Exo 2",
            size: 20,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} milhão${value > 1 ? "s" : ""}`,
          font: {
            family: "Exo 2",
            size: 20,
            weight: "semibold",
          },
          color: "#193D65",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  },
});

const ctx4 = document.getElementById("state4").getContext("2d");

new Chart(ctx4, {
  type: "bar",
  data: {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Consumo em milhões",
        data: [7, 5, 3, 6],
        backgroundColor: ["#AA00FF", "#AA00FF", "#193D65", "#193D65"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} milhões`,
        },
        titleFont: {
          family: "Exo 2",
          size: 20,
          weight: "bold",
        },
        bodyFont: {
          family: "Exo 2",
          size: 20,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Exo 2",
            size: 18,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#e0e0e0",
        },
        ticks: {
          callback: (value) => `${value} milhão${value > 1 ? "s" : ""}`,
          font: {
            family: "Exo 2",
            size: 18,
            weight: "semibold",
          },
          color: "#193D65",
        },
      },
    },
  },
});