function initializeMenuBehavior() {
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.sidebar');

    if (btn && sidebar) {
        btn.onclick = function () {
            sidebar.classList.toggle('active');
        };
    }
}