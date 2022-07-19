import '../scss/main.scss'
import '../scss/days.scss'
import {months, daysOfTheWeek} from './daysandmonth.js'

const date = new Date()
const renderCal = () => {
    date.setDate(1)
    const monthsDays = document.querySelector('.days')
    const amountOfDaysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
    const amountOfDaysInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    const firstDayIndex = date.getDay()
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay() 
    document.querySelector('.date h1').innerHTML = months[date.getMonth()]
    let currentDay = new Date()
    document.querySelector('.date p').innerHTML = 
    `${daysOfTheWeek[currentDay.getDay()]} ${currentDay.getDate().toLocaleString()} 
    ${months[date.getMonth()]} ${date.getFullYear()}`
    let days =''
    for (let j = firstDayIndex; j > 0; j--) {
        days += `<div class="prev-date">${amountOfDaysInPrevMonth-j}</div>`
    }
    for (let i = 1; i <= amountOfDaysInMonth; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`
        } else {
            days += `<div>${i}</div>`
        }
    }
    for (let x = 1; x <= 6 - lastDayIndex; x++) {
        days += `<div class="next-date">${x}</div>`
        monthsDays.innerHTML = days
    }
}

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1)
    renderCal()
})

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1)
    renderCal()
})
renderCal()