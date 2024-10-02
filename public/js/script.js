document.addEventListener("DOMContentLoaded", function () {
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");
  const dot3 = document.getElementById("dot3");

  dot1.classList.add("active");
  dot2.classList.remove("active");
  dot3.classList.remove("active");

  updateLabels(1);
});

document.getElementById("btnContinuar").addEventListener("click", function () {
  console.log("Botão Continuar clicado");
  const inputContainer = document.getElementById("inputContainer");
  const hiddenInputs = document.getElementById("hiddenInputs");
  const finalStep = document.getElementById("finalStep");
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");
  const dot3 = document.getElementById("dot3");

  if (
    inputContainer.classList.contains("inputs-step1") &&
    !inputContainer.classList.contains("hidden")
  ) {
    console.log("Passando do Passo 1 para o Passo 2");
    inputContainer.classList.add("hidden");
    hiddenInputs.classList.remove("hidden");

    dot1.classList.remove("active");
    dot2.classList.add("active");
    dot3.classList.remove("active");

    btnContinuar.textContent = "Continuar";
    updateLabels(2);
  } else if (
    hiddenInputs.classList.contains("inputs-step2") &&
    !hiddenInputs.classList.contains("hidden")
  ) {
    console.log("Passando do Passo 2 para o Passo 3");
    hiddenInputs.classList.add("hidden");
    finalStep.classList.remove("hidden");

    dot1.classList.remove("active");
    dot2.classList.remove("active");
    dot3.classList.add("active");

    btnContinuar.textContent = "Finalizar";
    updateLabels(3);
  }
});

function navigateToStep(stepNumber) {
  const inputContainer = document.getElementById("inputContainer");
  const hiddenInputs = document.getElementById("hiddenInputs");
  const finalStep = document.getElementById("finalStep");
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");
  const dot3 = document.getElementById("dot3");

  inputContainer.classList.add("hidden");
  hiddenInputs.classList.add("hidden");
  finalStep.classList.add("hidden");

  dot1.classList.remove("active");
  dot2.classList.remove("active");
  dot3.classList.remove("active");

  if (stepNumber === 1) {
    inputContainer.classList.remove("hidden");
    dot1.classList.add("active");
    btnContinuar.textContent = "Continuar";
  } else if (stepNumber === 2) {
    hiddenInputs.classList.remove("hidden");
    dot2.classList.add("active");
    btnContinuar.textContent = "Continuar";
  } else if (stepNumber === 3) {
    finalStep.classList.remove("hidden");
    dot3.classList.add("active");
    btnContinuar.textContent = "Finalizar";
  }

  // updateLabels(stepNumber);
}

document.getElementById("dot1").addEventListener("click", function () {
  navigateToStep(1);
});
document.getElementById("dot2").addEventListener("click", function () {
  navigateToStep(2);
});
document.getElementById("dot3").addEventListener("click", function () {
  navigateToStep(3);
});


let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showNextSlide() {
    slides[currentIndex].classList.remove('active');
    dots.forEach(dot => dot.classList.remove('active'));

    currentIndex = (currentIndex + 1) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 4000);

