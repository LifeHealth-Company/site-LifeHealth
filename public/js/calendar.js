const start = document.getElementById('startDate');
const end = document.getElementById('endDate');

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

        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = getDaysInMonth(year, month);

        // Dias do mês anterior que aparecem na primeira semana
        let prevMonth = month === 0 ? 11 : month - 1;
        let prevYear = month === 0 ? year - 1 : year;
        let daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

        for (let i = firstDay; i > 0; i--) {
            daysContainer.innerHTML += `<button class="day prev-month">${daysInPrevMonth - i + 1}</button>`;
        }

        // Dias do mês atual
        for (let day = 1; day <= daysInMonth; day++) {
            let fullDate = new Date(year, month, day).toISOString().split('T')[0]; // Formata para YYYY-MM-DD
            daysContainer.innerHTML += `<button  id="day-${year}-${month}-${day}" class="day current-month" onclick="selectDate(this)" value="${fullDate}">${day}</button>`;
        }

        // Dias do próximo mês que aparecem na última semana
        let totalDaysDisplayed = daysContainer.children.length;
        let nextDays = 42 - totalDaysDisplayed; // Para completar 42 dias no total

        for (let i = 1; i <= nextDays; i++) {
            daysContainer.innerHTML += `<button class="day next-month">${i}</button>`;
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

let startDate = null
let endDate = null


function selectDate(res) {
    res.classList.add("selectedDate")
    let selectedDate = new Date(res.value); 
    selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 1));
    let copy = new Date(selectedDate.getTime());
    // console.log(new Date(copy.setDate(copy.getDate())))
    if (!startDate) {
        startDate = selectedDate;
    } else if (selectedDate > startDate && !endDate) {
        endDate = selectedDate;
    } else if (selectedDate > startDate && selectedDate < endDate) {
        removeDates()
        endDate = selectedDate
    } else if (selectedDate > startDate && selectedDate > endDate) {
        endDate = selectedDate
    } else if (selectedDate < startDate) {
        startDate = selectedDate
    }

        if(startDate.getMonth() + 1 >= 1 && startDate.getMonth() + 1 <= 9 && startDate.getDate() + 1 >= 1 && startDate.getDate() + 1 <= 9){
            start.textContent = `0${startDate.getDate()}/0${startDate.getMonth() + 1}/${startDate.getFullYear()}`
        }else if(startDate.getMonth() + 1 >= 1 && startDate.getMonth() + 1 <= 9){
            start.textContent = `${startDate.getDate()}/0${startDate.getMonth() + 1}/${startDate.getFullYear()}`
        }else if(startDate.getDate() + 1 >= 1 && startDate.getDate() + 1 <= 9){
            start.textContent = `${startDate.getDate()}/0${startDate.getMonth() + 1}/${startDate.getFullYear()}`
        }else{
            start.textContent = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
        }

        if(endDate.getMonth() + 1 >= 1 && endDate.getMonth() + 1 <= 9 && endDate.getDate() + 1 >= 1 && endDate.getDate() + 1 <= 9){
            end.textContent = `0${endDate.getDate()}/0${endDate.getMonth() + 1}/${endDate.getFullYear()}`
        }else if(endDate.getMonth() + 1 >= 1 && endDate.getMonth() + 1 <= 9){
            end.textContent = `${endDate.getDate()}/0${endDate.getMonth() + 1}/${endDate.getFullYear()}`
        }else if(endDate.getDate() + 1 >= 1 && endDate.getDate() + 1 <= 9){
            end.textContent = `${endDate.getDate()}/0${endDate.getMonth() + 1}/${endDate.getFullYear()}`
        }else{
            end.textContent = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`
        }
    fillDates()

    function removeDates() {

        let startDay = new Date(startDate.setDate(startDate.getDate() ));
        let endDay = endDate ? new Date(endDate) : null;
        
        let formattedStartDay = new Date(startDay)
        let startDayElement = document.querySelector(`#day-${formattedStartDay.getFullYear()}-${formattedStartDay.getMonth()}-${formattedStartDay.getDate()}`);
        let formattedEndDay = new Date(endDay)
        let endDayElement = document.querySelector(`#day-${formattedEndDay.getFullYear()}-${formattedEndDay.getMonth()}-${formattedEndDay.getDate()}`);
     
        for (let day = new Date(startDay.setDate(startDay.getDate() )); day < endDay; day.setDate(day.getDate() + 1)){
            console.log(day)
            let formattedDay = new Date(day)
            let dayElement = document.querySelector(`#day-${formattedDay.getFullYear()}-${formattedDay.getMonth()}-${formattedDay.getDate()}`);
            if (dayElement) {
                dayElement.classList.remove("period");
                dayElement.classList.remove("selectedDate");
            }
        }
        startDayElement.classList.add("selectedDate");
        endDayElement.classList.remove("selectedDate");
  
    }

    function fillDates() {
        // Converte as datas para número de dias para simplificar o loop
        let startDay = new Date(startDate.setDate(startDate.getDate() ));
        let endDay = endDate ? new Date(endDate.setDate(endDate.getDate())) : null;
        if (endDay) {
            for (let day = new Date(startDay.setDate(startDay.getDate() )); day < endDay; day.setDate(day.getDate() + 1)) {
                let formattedDay = new Date(day)
                let dayElement = document.querySelector(`#day-${formattedDay.getFullYear()}-${formattedDay.getMonth()}-${formattedDay.getDate()}`);
                if (dayElement) {
                    dayElement.classList.remove("period");
                }
            }    
            
            for (let day = new Date(startDay.setDate(startDay.getDate() + 1)); day < endDay; day.setDate(day.getDate() + 1)) {
                let formattedDay = new Date(day)
                let dayElement = document.querySelector(`#day-${formattedDay.getFullYear()}-${formattedDay.getMonth()}-${formattedDay.getDate()}`);
                if (dayElement) {
                    dayElement.classList.add("period");
                    dayElement.classList.remove("selectedDate");
                }
            }
        }

        let formattedEndDay = new Date(endDay)
        let endDayElement = document.querySelector(`#day-${formattedEndDay.getFullYear()}-${formattedEndDay.getMonth()}-${formattedEndDay.getDate()}`);
        endDayElement.classList.add("selectedDate");
    }
  
}