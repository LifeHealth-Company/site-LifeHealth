let title = document.querySelector("#title")
let descricao = document.querySelector("#descricao")
const btnVG = document.querySelector("#btnVG")
const btnMissao = document.querySelector("#btnMissao")
const btnObj = document.querySelector("#btnObj")
const menuIcon = document.querySelector("#menuIcon")
const menu = document.querySelector("#menu")
const circulo = document.querySelector("#circulo")
const image1 = document.querySelector("#image1")
const image2 = document.querySelector("#image2")
const image3 = document.querySelector("#image3")
const image4 = document.querySelector("#image4")
const titulo = document.querySelector("#titulo")
const descricaoServico = document.querySelector("#descricaoServico")

let isOpenMenu = false
let service = 0
let circlePosition = 45

title.textContent = desc[0].title
descricao.textContent = desc[0].desc
btnVG.classList.add("active")

image1.src = services[0].url
image2.src = services[1].url
image3.src = services[2].url
image4.src = services[3].url


titulo.textContent = services[service].title
descricaoServico.textContent = services[service].desc

function changedesc(res) {
    title.textContent = desc[res.value].title
    descricao.textContent = desc[res.value].desc

    if (res.value == 0) {
        btnObj.classList.remove("active")
        btnMissao.classList.remove("active")
        btnVG.classList.add("active")
    } else if (res.value == 1) {
        btnVG.classList.remove("active")
        btnObj.classList.remove("active")
        btnMissao.classList.add("active")
    } else {
        btnMissao.classList.remove("active")
        btnVG.classList.remove("active")
        btnObj.classList.add("active")
    }

}

function openMobileMenu() {
    if (isOpenMenu == false) {
        menuIcon.classList.remove("fa-bars")
        menuIcon.classList.add("fa-x")
        isOpenMenu = true
        menu.style.transform = "translateX(0px)";
        menu.style.visibility = "visible"
    } else {
        menuIcon.classList.add("fa-bars")
        menuIcon.classList.remove("fa-x")
        isOpenMenu = false
        menu.style.transform = "translateX(380px)";
        menu.style.visibility = "hidden"
        
    }
}

function rotateCircle(res){
    res.dataset.value == "negative" ? circlePosition += 90 : circlePosition -= 90
    res.dataset.value == "negative" ? service -= 1 : service++
    circulo.style.transform = `rotate(${circlePosition}deg)`

    if(service < 0){
        service = 3
    }else if(service > 3){
        service = 0
    }
    titulo.textContent = services[service].title
    descricaoServico.textContent = services[service].desc
}

