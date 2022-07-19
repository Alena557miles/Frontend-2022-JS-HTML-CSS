const list = document.querySelector('.characters-list');
const start = document.querySelector('.start');
const fight = document.querySelector('.fight');
const buttons = document.querySelectorAll('.character')
const battleField = document.querySelector('.battle-field');

class Unit{
    constructor(name,health, armor, damage, attackRate){
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.damage = damage;
        this.attackRate = attackRate;
    }
}
const Archimonde = new Unit('Archimonde',3475,11,62,500);
const Raider = new Unit('Raider',610,1,23,200);
const Sylvanas = new Unit('Sylvanas',825,6,30,150);
const Paladin = new Unit('Paladin',650,4,24,195);
const Footman = new Unit('Footman',420,2,12,30);

const arrayOfCharacters = new Array(Raider, Archimonde, Sylvanas, Paladin, Footman)

const indexOpp = Math.floor(Math.random() * arrayOfCharacters.length);
const opponent = arrayOfCharacters[indexOpp]
console.log(opponent)

class Display{
    constructor(start,array,list,buttons,battleField){
        this.start = start;
        this.array = array;
        this.list = list;
        this.buttons = buttons;
        this.battleField = battleField;
    }
    renderCharacter(){
        for (let i = 0; i< this.array.length; i++) {
            list.innerHTML = list.innerHTML + 
            `<button class="character" id="${i}">${this.array[i].name}</button>`
        }
        const buttons = document.querySelectorAll('.character')
        buttons.forEach(e => e.classList.add('hidden'));
    }
    showAlert(){
        this.start.addEventListener('click',() => {
            alert(`Choose your fighter`);
            const buttons = document.querySelectorAll('.character')
            buttons.forEach(e => e.classList.remove('hidden'));
        })
    }
    hideStartBtn(){
        this.start.addEventListener('click',() => {
            this.start.classList.add('hidden')
        })
    }
    renderFighter(playerId){
        this.battleField.innerHTML = 
        `<div class="player">
            <h2 class="player__title">${this.array[playerId].name}</h2>
            <p class="player__health">health: <span>${this.array[playerId].health}</span></p>
            <p class="player__armor">armor: ${this.array[playerId].armor}</p>
            <p class="player__damage">damage: ${this.array[playerId].damage}</p>
            <p class="player__attack-rate">attack rate: ${this.array[playerId].attackRate}</p>
        </div>
        ` 
            +
        `<div class="opponent" id="${opponent.id}">
            <h2 class="opponent___title">${opponent.name}</h2>
            <p class="opponent__health">health: <span>${opponent.health}</span></p>
            <p class="opponent___armor">armor: ${opponent.armor}</p>
            <p class="opponent___damage">damage: ${opponent.damage}</p>
            <p class="opponent___attack-rate">attack rate: ${opponent.attackRate}</p>
        </div>
        `
        const fight = document.querySelector('.fight'); 
        fight.classList.remove('hidden');  
    }
}

let display = new Display(start,arrayOfCharacters,list,buttons,battleField)

display.showAlert()
display.hideStartBtn()
display.renderCharacter()

class Game{ 

    constructor(fighter1,fighter2){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
    }
    game(){
        let intr1 = setInterval(() => {
            let fighter2Health = document.querySelector(`.opponent__health`);
                if (this.fighter2.health <= 0 || this.fighter1.health <= 0 ) {
                    clearInterval(intr1);
                    } else {
                        this.fighter2.health = this.fighter2.health - (this.fighter1.damage - this.fighter2.armor);
                        if (this.fighter2.health <= 0 ){
                            fighter2Health.innerHTML = `health: <span>0</span>`;
                            clearInterval(intr1);
                            setTimeout(() => {
                                alert(`${this.fighter1.name} is a winner`)
                                document.location.reload()
                            },500)   
                            document.location.reload()                       
                        } else {
                            fighter2Health.innerHTML = `health: <span>${this.fighter2.health}</span>`;
                        }
                    }
                }, this.fighter1.attackRate);
    
        let intr2 = setInterval(() => {
            let fighter1Health = document.querySelector(`.player__health`);           
            if (this.fighter2.health <= 0 || this.fighter1.health <= 0 ) {
                clearInterval(intr2);
                } else {
                    this.fighter1.health = this.fighter1.health - (this.fighter2.damage - this.fighter1.armor);
                    if (this.fighter1.health <= 0 ){
                        fighter1Health.innerHTML = `health: <span>0</span>`;
                        clearInterval(intr2);
                        setTimeout(() => {
                            alert(`${this.fighter2.name} is a winner`)
                            document.location.reload()
                        },500)   
                        
                    } else {
                        fighter1Health.innerHTML = `health: <span>${this.fighter1.health}</span>`;
                    }
                }  
            }, this.fighter2.attackRate);
        }
}

list.addEventListener('click', (e) => {
    const player = arrayOfCharacters[e.target.id];
    const playerId = e.target.id;
    console.log(player)
    // hide all fighters
    const buttons = document.querySelectorAll('.character')
    buttons.forEach(e => e.classList.add('hidden'));
    display.renderFighter(playerId)

    fight.addEventListener('click', () => {
        let game = new Game(player,opponent)
        game.game()
    })
})










// start.addEventListener('click',() => {
//     alert(`Choose your fighter`);
//     for (let i = 0; i< arrayOfCharacters.length; i++) {
//         list.innerHTML = list.innerHTML + 
//         `<button class="character" id="${i}">${arrayOfCharacters[i].name}</button>`
//     }
//     start.classList.add('hidden')
// });

// list.addEventListener('click', (e) => {
//     const player = arrayOfCharacters[e.target.id]

//     //hide all fighters
//     const buttons = document.querySelectorAll('.character')
//     buttons.forEach(e => e.classList.add('hidden'));

//     //making battle field
//     battleField.innerHTML = 
//         `<div class="player" id="${e.target.id}">
//             <h2 class="player__title">${arrayOfCharacters[e.target.id].name}</h2>
//             <p class="player__health">health: <span>${arrayOfCharacters[e.target.id].health}</span></p>
//             <p class="player__armor">armor: ${arrayOfCharacters[e.target.id].armor}</p>
//             <p class="player__damage">damage: ${arrayOfCharacters[e.target.id].damage}</p>
//             <p class="player__attack-rate">attack rate: ${arrayOfCharacters[e.target.id].attackRate}</p>
//         </div>
//         ` 
//         +
//         `<div class="opponent" id="${opponent.id}">
//             <h2 class="opponent___title">${opponent.name}</h2>
//             <p class="opponent__health">health: <span>${opponent.health}</span></p>
//             <p class="opponent___armor">armor: ${opponent.armor}</p>
//             <p class="opponent___damage">damage: ${opponent.damage}</p>
//             <p class="opponent___attack-rate">attack rate: ${opponent.attackRate}</p>
//         </div>
//         ` 
//     fight.classList.remove('hidden');
//     fight.addEventListener('click', () => {
//         game(player,opponent)
//         })
// })

// function getRandomItem(arr) {
//     const randomIndex = Math.floor(Math.random() * arr.length);
//     const item = arr[randomIndex];
//     return item
// }
// let opponent = getRandomItem(arrayOfCharacters);
// console.log(opponent)

// function game(fighter1, fighter2){
//     let intr1 = setInterval(() => {
//         let fighter2Health = document.querySelector(`.opponent__health`);
//             if (fighter2.health <= 0 || fighter1.health <= 0 ) {
//                 clearInterval(intr1);
//                 } else {
//                     fighter2.health = fighter2.health - (fighter1.damage - fighter2.armor);
//                     if (fighter2.health <= 0 ){
//                         fighter2Health.innerHTML = `health: <span>0</span>`;
//                         clearInterval(intr1);
//                     } else {
//                         fighter2Health.innerHTML = `health: <span>${fighter2.health}</span>`;
//                     }
//                 }
//                 alertWinner(fighter1,fighter2)                
//             }, fighter1.attackRate);

//     let intr2 = setInterval(() => {
//         let fighter1Health = document.querySelector(`.player__health`);           
//         if (fighter2.health <= 0 || fighter1.health <= 0 ) {
//             clearInterval(intr2);
//             } else {
//                 fighter1.health = fighter1.health - (fighter2.damage - fighter1.armor);
//                 if (fighter1.health <= 0 ){
//                     fighter1Health.innerHTML = `health: <span>0</span>`;
//                     clearInterval(intr2);
//                 } else {
//                     fighter1Health.innerHTML = `health: <span>${fighter1.health}</span>`;
//                 }
//             }
//             alertWinner(fighter1,fighter2)
//         }, fighter2.attackRate);

// }
// function reset (){

// }
// function alertWinner(fighter1,fighter2){
//     if (fighter2.health <= 0 || fighter1.health <= 0){
//         if (fighter1.health < fighter2.health){
//             alert(`${fighter2.name} is a winner`)
//         } else if (fighter2.health < fighter1.health){
//             alert (`${fighter1.name} is a winner`)
//         } else {
//             alert(`Draw`)
//         }            
//     }
// }

