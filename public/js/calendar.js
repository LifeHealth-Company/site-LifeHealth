document.addEventListener('DOMContentLoaded', function () {
    const monthAndYear = document.getElementById('monthAndYear');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentYear = 2021;
    let currentMonth = 0; // Janeiro

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ];
    
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function renderCalendar(year, month) {
        monthAndYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = getDaysInMonth(year, month);

        // Dias do mês anterior que aparecem na primeira semana
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

        for (let i = firstDay; i > 0; i--) {
            daysContainer.innerHTML += `<div class="day prev-month">${daysInPrevMonth - i + 1}</div>`;
        }

        // Dias do mês atual
        for (let day = 1; day <= daysInMonth; day++) {
            daysContainer.innerHTML += `<div class="day current-month">${day}</div>`;
        }

        // Dias do próximo mês que aparecem na última semana
        const totalDaysDisplayed = daysContainer.children.length;
        const nextDays = 42 - totalDaysDisplayed; // Para completar 42 dias no total

        for (let i = 1; i <= nextDays; i++) {
            daysContainer.innerHTML += `<div class="day next-month">${i}</div>`;
        }
    }

    prevButton.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextButton.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    renderCalendar(currentYear, currentMonth);
});
