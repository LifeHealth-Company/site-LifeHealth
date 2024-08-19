let title = document.querySelector("#title")
let descricao = document.querySelector("#descricao")
const btnVG = document.querySelector("#btnVG")
const btnMissao = document.querySelector("#btnMissao")
const btnObj = document.querySelector("#btnObj")

title.textContent = desc[0].title
descricao.textContent = desc[0].desc
btnVG.classList.add("active")

function changedesc(res){
    title.textContent = desc[res.value].title
    descricao.textContent = desc[res.value].desc

    if(res.value == 0){
        btnObj.classList.remove("active")
        btnMissao.classList.remove("active")
        btnVG.classList.add("active")
    }else if(res.value == 1){
        btnVG.classList.remove("active")
        btnObj.classList.remove("active")
        btnMissao.classList.add("active")
    }else{
        btnMissao.classList.remove("active")
        btnVG.classList.remove("active")
        btnObj.classList.add("active")
    }

}