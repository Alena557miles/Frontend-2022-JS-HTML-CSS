import '../scss/index.scss'
import '../scss/btns.scss'
import '../scss/game-score.scss'

import { randomSelection } from './random-selection'
import { checkWin } from './check-winner'
import { addResult } from './render-result.js'
import { incrementScore } from './increment-score.js'

let roundNumber = 0;
const results = document.querySelector('.results')
const yourScore = document.querySelector('[data-your-score]')
const opponentScore = document.querySelector('[data-opponent-score]')
const btnsSelection = document.querySelectorAll('[data-selection]')
const reset = document.querySelector('.reset')

const SELECTIONS = [
    {
        name: 'rock',
        beats: 'scissors'
    },
    {
        name: 'scissors',
        beats: 'paper'
    },
    {       
        name: 'paper',
        beats: 'rock'
    }
]

reset.addEventListener('click', () => {
    document.location.reload()
})

btnsSelection.forEach(btn => {
    btn.addEventListener('click', () => {
        const player1 = btn.dataset.selection
        const select = SELECTIONS.find(select => select.name === player1)
        makeChoise(select)
    })
})

const makeChoise = (select) => {
    const opponent = randomSelection(SELECTIONS);
    const player1Winner = checkWin(select,opponent);
    const opponentWinner = checkWin(opponent,select);
    roundNumber += 1;

    if (opponentWinner) {
        addResult(results,select.name, opponent.name,roundNumber,'You’ve LOST!')
        incrementScore(opponentScore)
    } else if(player1Winner) {
        addResult(results,select.name, opponent.name,roundNumber,'You’ve WON!')
        incrementScore(yourScore)
    } else {
        addResult(results,select.name, opponent.name,roundNumber,'Draw')
    }

    if (+yourScore.innerHTML === 3 || +opponentScore.innerHTML === 3) {
        const WINNERNAME = +yourScore.innerHTML === 3 ? 'YOU' : 'Opponent'
        const winner = document.createElement('div')
        winner.classList.add('winner');
        winner.innerHTML = `GAME OVER. ${WINNERNAME} WON`
        results.before(winner)
        btnsSelection.forEach(btn => {
            btn.classList.add('hidden')
        })
    }
} 
