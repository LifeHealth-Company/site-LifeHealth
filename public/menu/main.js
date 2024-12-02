let btn = document.querySelector('#btn');
  let sidebar = document.querySelector('.sidebar')
  btn.onclick = function () {
    sidebar.classList.toggle('active');
  };

  let trilho = document.getElementById('trilho');
  let body = document.querySelector('body');
  trilho.addEventListener('click', () =>{
    trilho.classList.toggle('dark')
    body.classList.toggle('dark')
<<<<<<< HEAD

  })

  
=======
    sidebar.classList.toggle('dark')

  })
>>>>>>> main
