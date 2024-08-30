let title = document.querySelector("#title")
let descricao = document.querySelector("#descricao")
const btnVG = document.querySelector("#btnVG")
const btnMissao = document.querySelector("#btnMissao")
const btnObj = document.querySelector("#btnObj")
const menuIcon = document.querySelector("#menuIcon")
const menu = document.querySelector("#menu")
const circulo = document.querySelector("#circulo")

let isOpenMenu = false

title.textContent = desc[0].title
descricao.textContent = desc[0].desc
btnVG.classList.add("active")

let circlePosition = 45
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
    circulo.style.transform = `rotate(${circlePosition}deg)`
}
