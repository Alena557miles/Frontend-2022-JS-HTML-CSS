'use strict'
let result=confirm('Do you want to play a game?');
let totalPrize = 0; // prize of win
let playGame = true;
let two = 2;
let counterCycle = 2;
let attempts=3;//number of attempts
let rangeBigger = 4;
let prizeBigger = 2;

function getRandomIntInclusive(min, max) { // function to find random number of pocket
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //max & min are incl
  }

if (!result) {
    alert('You did not become a billionaire, but can.'); //user dont want to play.  In case the user clicks the 'Cancel' button, the message 'You did not become a billionaire, but can.' should be shown
} else {
    while (playGame){ //user want to play. If user clicked ‘Ok’ – start a game.
        let rangeNum = 8
        let totalPrize = 0; //how much user win
        let prize=100;
        let continueGame = true;
        while (continueGame){
            let winNum = getRandomIntInclusive(0, rangeNum); //run win machine. numbers from [0..8]
            console.log(winNum); //show win number for the first section
            let loss = false;
            for (let i=0; i < attempts; i++){ //gives 3 attempts to guess the numer of pocket
                let currentPrize=prize/Math.pow(two, i); //calculate prize for current attempt 
                let choose = prompt(`Enter a number of pocket on which the ball could land\n`+
                `Choose a roulette pocket from 0 to ${rangeNum}\n`+`Attempts left: ${attempts-i}\n`+
                `Total prize: ${totalPrize}$\n`+`Possible prize on current attempt: ${currentPrize}$`); 
        if (isNaN(choose) || choose < 0 || choose > rangeNum || choose ===' ' || choose ===''||choose ===null ) {
                    alert(`It is not a roulette pocket number from 0 to ${rangeNum}`);
                    if (i===counterCycle){ //if user enter wrong data
                        loss = true;
                        totalPrize =0;//total prize became ZERO
                       }
                    } else if (Number(choose) === winNum){ //user win
                        totalPrize += currentPrize; 
                        break; // quit from cycle 'for'
                        } else { //user loss 3 attempts
                        if (i===counterCycle){
                            loss = true;
                            totalPrize =0;//total prize became ZERO
                           }
                        }           
            }
            if (loss){ //user loss 3 attempts - quit from current game (cycle)
                break;                  
            }
            continueGame = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`); //user win asking to continue the game y/n
            if (continueGame){ //user want to continue the game   - rates go up and come back for cycle for
                prize *=prizeBigger;
                rangeNum +=rangeBigger;
            } else { //user dont want to continue  - quit from cycle while - continueGame
                continueGame = false;
                break;
            }
        } 
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`); //asking user to play again
        playGame = confirm('Do you want to play again?'); 
    }
}
