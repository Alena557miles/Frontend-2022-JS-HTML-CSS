const root = document.getElementById('root');
const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('search-btn')
let arrayFromLocalId = JSON.parse(localStorage.getItem('characterID'))
let charArray = JSON.parse(localStorage.getItem('characterID')) ? JSON.parse(localStorage.getItem('characterID')) : []
let loadMoreBTN = document.querySelector('.load-more')
let numberCardsOnScreen = 5

searchInput.placeholder = `Please, enter id from 1 to ${JSON.parse(localStorage.getItem('count')) }`;
loadMoreBTN.classList.add('hide')

async function infoAPI () {
    fetch(`https://rickandmortyapi.com/api/character/`)
        .then(response => response.json())
        .then(data => {
            let count = data.info.count
            localStorage.setItem('count', JSON.stringify(count))
        })
}
infoAPI()

async function showValue() {
    let numberId = +searchInput.value
    try {
        if (isNaN(numberId)) {
            throw new Error('Please, input a number')
        }
        if (numberId > JSON.parse(localStorage.getItem('count')) || numberId < 1) {
            throw new Error('Character not found')
        }
        if (charArray.includes(numberId)) {
            throw new Error('Character is already in the list')
        }
        charArray.push(numberId)
        localStorage.setItem('characterID', JSON.stringify(charArray))
        await createElement(numberId)
        if (charArray.length > numberCardsOnScreen) {
            loadMoreBTN.classList.remove('hide')
            // document.getElementById(`character-card-${charArray[charArray.length - 6]}`).classList.add('hide')
            for (let i = 0; i < charArray.length - numberCardsOnScreen; i++){
                document.getElementById(`character-card-${charArray[i]}`).classList.add('hide')
            }
        }
        } catch (e) {
        alert(e.message)
    }
    searchInput.value =''
}
btnSearch.addEventListener('click', showValue)

const deleteCharacter = (e) => {
    if (e.target.className ==='delete-btn'){
        document.getElementById(`character-card-${e.target.id}`).remove()
        for (let i = 0; i<charArray.length; i++) {
            if (+e.target.id === charArray[i]){
                charArray.splice(i, 1);
            }
        }
        console.log(charArray)
        localStorage.setItem('characterID',JSON.stringify(charArray))
    }
}
document.addEventListener('click', deleteCharacter)

async function createElement (element, hide='', reverse = false) {
    if (reverse){
        await fetch(`https://rickandmortyapi.com/api/character/${element}`)
        .then(response => response.json())
        .then(data => {
        const cardContainer = document.querySelector('#characters-wrap')
        cardContainer.innerHTML =
        cardContainer.innerHTML + 
            `<article id='character-card-${data.id}' class='character-card ${hide}'>
                <div class='img-wrapper'>
                    <img src='${data.image}'></img>
                </div>
                <div class='character-content-wrapper'>
                    <h2>${data.name}</h2>
                </div>
                <div>            
                    <button id='${data.id}' class='delete-btn'>Delete</button>
                </div>
            </article>`
        })
    } else {
        await fetch(`https://rickandmortyapi.com/api/character/${element}`)
        .then(response => response.json())
        .then(data => {
        const cardContainer = document.querySelector('#characters-wrap')
        cardContainer.innerHTML =   
            `<article id='character-card-${data.id}' class='character-card ${hide}'>
                <div class='img-wrapper'>
                    <img src='${data.image}'></img>
                </div>
                <div class='character-content-wrapper'>
                    <h2>${data.name}</h2>
                </div>
                <div>            
                    <button id='${data.id}' class='delete-btn'>Delete</button>
                </div>
            </article>`
            + cardContainer.innerHTML
        })
    }

}

renderCards(arrayFromLocalId)
async function renderCards(arrayFromLocalId) {
    if (arrayFromLocalId.length < numberCardsOnScreen + 1) {
        for (let i = 0; i < arrayFromLocalId.length; i++){
             createElement(arrayFromLocalId[i])
        }        
    } else {
        for (let i = arrayFromLocalId.length - numberCardsOnScreen; i < arrayFromLocalId.length; i++) {
             createElement(arrayFromLocalId[i])
        }
        for (let i = 0; i < arrayFromLocalId.length - numberCardsOnScreen; i++){
            createElement(arrayFromLocalId[i], 'hide', true)
        }
        loadMoreBTN.classList.remove('hide')
    }
}

loadMoreBTN.addEventListener('click', showHidden)
function showHidden() {
    let hiddenElements = Array.from(document.querySelectorAll('.hide'))
    hiddenElements.forEach( (element) => {
        element.classList.remove('hide')
    })
    loadMoreBTN.classList.add('hide')
}

