function loadMenu() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../menu/style.css';
    document.head.appendChild(link);

    fetch('../menu/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            initializeMenuBehavior();
        })
        .catch(error => console.error('Error loading menu:', error));
}

document.addEventListener('DOMContentLoaded', loadMenu);

let trilho = document.getElementById('trilho');
let body = document.querySelector('body');
trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark')
  body.classList.toggle('dark')
  sidebar.classList.toggle('dark')

})
