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

function initializeMenuBehavior() {
  let trilho = document.getElementById('trilho');
  let body = document.querySelector('body');
  let sidebar = document.querySelector('.sidebar'); // Certifique-se de que este seletor está correto
  trilho.addEventListener('click', () => {
      trilho.classList.toggle('dark');
      body.classList.toggle('dark');
      if (sidebar) {
          sidebar.classList.toggle('dark');
      }
  });
}

document.addEventListener('DOMContentLoaded', loadMenu);