document.addEventListener("DOMContentLoaded", function () {
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");
  const dot3 = document.getElementById("dot3");

  dot1.classList.add("active");
  dot2.classList.remove("active");
  dot3.classList.remove("active");

  updateLabels(1);
  loadFormData();
});

// document.getElementById("btnContinuar").addEventListener("click", function () {
//   console.log("Botão Continuar clicado");
//   const inputContainer = document.getElementById("inputContainer");
//   const hiddenInputs = document.getElementById("hiddenInputs");
//   const finalStep = document.getElementById("finalStep");
//   const dot1 = document.getElementById("dot1");
//   const dot2 = document.getElementById("dot2");
//   const dot3 = document.getElementById("dot3");

//   saveFormData();

//   if (
//     inputContainer.classList.contains("inputs-step1") &&
//     !inputContainer.classList.contains("hidden")
//   ) {
//     console.log("Passando do Passo 1 para o Passo 2");
//     inputContainer.classList.add("hidden");
//     hiddenInputs.classList.remove("hidden");

//     dot1.classList.remove("active");
//     dot2.classList.add("active");
//     dot3.classList.remove("active");

//     btnContinuar.textContent = "Continuar";
//     updateLabels(2);
//   } else if (
//     hiddenInputs.classList.contains("inputs-step2") &&
//     !hiddenInputs.classList.contains("hidden")
//   ) {
//     console.log("Passando do Passo 2 para o Passo 3");
//     hiddenInputs.classList.add("hidden");
//     finalStep.classList.remove("hidden");

//     dot1.classList.remove("active");
//     dot2.classList.remove("active");
//     dot3.classList.add("active");

//     btnContinuar.textContent = "Finalizar";
//     updateLabels(3);
//     cadastrar();
//   }
// });


let step = 1;

document.getElementById("btnContinuar").addEventListener("click", function () {
    if (step === 1) {
        document.getElementById("inputContainer").classList.add("hidden");
        document.getElementById("hiddenInputs").classList.remove("hidden");
        dot1.classList.remove("active");
        dot2.classList.add("active");
        step++;
    } else if (step === 2) {
        document.getElementById("hiddenInputs").classList.add("hidden");
        document.getElementById("finalStep").classList.remove("hidden");
        dot2.classList.remove("active");
        dot3.classList.add("active");
        step++;
    } else if (step === 3) {
        cadastrar();  // Chama a função de cadastro no step final
    }
});


function saveFormData() {
  const formData = {
    step1: {
      input1: document.getElementById("input_nomeInstituicao").value,
      input2: document.getElementById("input_nomeResponsavel").value,
      input3: document.getElementById("input_tipoInstituicao").value,
      input4: document.getElementById("input_cnpj").value,
      input5: document.getElementById("input_cep").value,
      input6: document.getElementById("input_estado").value,
      input7: document.getElementById("input_email_cadastrar").value,
      input8: document.getElementById("input_senha_cadastro").value,
      input9: document.getElementById("input_confirma_senha").value,
    }
  };
  localStorage.setItem("formData", JSON.stringify(formData));
}

function loadFormData() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    document.getElementById("input_nomeInstituicao").value = formData.step1.input1 || "";
    document.getElementById("input_nomeResponsavel").value = formData.step1.input2 || "";
    document.getElementById("input_tipoInstituicao").value = formData.step1.input3 || "";
    document.getElementById("input_cnpj").value = formData.step1.input4 || "";
    document.getElementById("input_cep").value = formData.step1.input5 || "";
    document.getElementById("input_estado").value = formData.step1.input6 || "";
    document.getElementById("input_email_cadastrar").value = formData.step1.input7 || "";
    document.getElementById("input_senha_cadastro").value = formData.step1.input8 || "";
    document.getElementById("input_confirma_senha").value = formData.step1.input9 || "";
  }
}


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

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".custom-dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("custom-dot-active"));

  slides[index].classList.add("active");
  dots[index].classList.add("custom-dot-active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);

setInterval(nextSlide, 5000);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    currentSlide = index;
  });
});

//function toggleSelection(circle, selectedOptionId, otherOptionId, element) {
//  const selectedOption = document.getElementById(selectedOptionId);
//  const otherOption = document.getElementById(otherOptionId);

//  if (selectedOption.classList.contains("selected")) {
//    selectedOption.classList.remove("selected");
//    circle.classList.remove("selected-circle");
//    otherOption.classList.remove("blocked");
//  } else {
//    selectedOption.classList.add("selected");
//    circle.classList.add("selected-circle");
//    otherOption.classList.add("blocked");
//  }
//}

function toggleSelection(element, option1, option2) {
    // Remove a classe 'checked' de todos os elementos
    document.querySelectorAll('.select-circle').forEach(circle => {
        circle.classList.remove('checked');
    });

    // Adiciona a classe 'checked' ao elemento clicado
    element.classList.add('checked');

    // Lógica adicional para manipular as opções
    document.getElementById(option1).classList.add('selected');
    document.getElementById(option2).classList.remove('selected');
}


function closeModal() {
  document.querySelector(".modal").style.display = "none";
}

function cancelSelection() {
  if (selected) {
    selected.classList.remove("selected");
    selected = null;
  }
  document.getElementById("selectPlanBtn").classList.add("disabled");
  document.getElementById("selectPlanBtn").disabled = true;
}

function openModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const closeBtn = document.querySelector(".close-btn");
  const glassEffect = document.querySelector(".glass-effect");

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      const modal = document.querySelector(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  }

  if (glassEffect) {
    glassEffect.addEventListener("click", function () {
      const modal = document.querySelector(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  }
});
function redirectToCadastro() {
    window.location.href = 'cadastro.html'; 
}
