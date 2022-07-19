window.addEventListener('DOMContentLoaded', () => {
    // function for creating table for game
    function createTiles(){
        const container = document.querySelector('.container');
        for (let i = 0; i < 9; i++) {
            let row = document.createElement('div');
            row.classList.add('tile');
            row.setAttribute('id', i)
            container.appendChild(row)
        }
    }

let res = document.getElementsByClassName('tile')
console.log(res)

console.log(res[3])
    createTiles()

    const avatars = document.querySelectorAll('[data-item]')
    const resetButton = document.getElementById('reset');
    const tiles = document.querySelectorAll('.tile');
    const displayPlayer = document.querySelector('.display-player');
    const container = document.querySelector('.container');
    const announcer = document.querySelector('.announcer')
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    
    let board = ['','','','','','','','','']
    let currentPlayer = 'X';
    let isGame = true;
    let n = 0;
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };
    
    avatars.forEach(e => {
        e.setAttribute('draggable', 'true');
        e.addEventListener('mousedown', () => {
            dragAndDrop(e)  
        })
    })
    
    const dragAndDrop = (avatar) => {
        let slotOpen= true;
        const containersForAvatars = document.querySelectorAll('.avatar-container');
        const dragStart = function (){
            setTimeout(() => {
                this.classList.add('hide')
            },0)
        }
        const dragEnd = function () {
            this.classList.remove('hide')
        }
        const dragOver = function(e) {
            e.preventDefault()
        }      
        const dragDrop = function () {  
            if (slotOpen && this.firstChild === null){
                this.appendChild(avatar)
                slotOpen = false;
                avatar.setAttribute('draggable', 'false');
            }
        }
        containersForAvatars.forEach(container => {
            container.addEventListener('dragover', dragOver)
            container.addEventListener('drop', dragDrop)
        });
        avatar.addEventListener('dragstart', dragStart);
        avatar.addEventListener('dragend',dragEnd);    
    }

    const changePlayer = () => {
        displayPlayer.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayPlayer.innerText = currentPlayer
        displayPlayer.classList.add(`player${currentPlayer}`)
    }
    // check if tile is a free or not
    const checkAction = (tile) => {
        if (tile.innerHTML === 'X'|| tile.innerHTML === 'O') {
            return false
        }
        return true
    }
    // fill in board by the users steps
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }
    // cheking game status and return result (winner/tie)
    function handleResultValidation() {
        let winner = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            const winComb = winningCombinations[i];
            const a = board[winComb[0]];
            const b = board[winComb[1]];
            const c = board[winComb[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                winner = true;
                break;
            }
        }    
    if (winner) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGame = false;
            return;
        }    
    if (!board.includes('')) {
        announce(TIE);
        }
    }

   // listeting events on board and filled them up (playing game)
    const action = (tile,index) => {
        if (checkAction(tile) && isGame) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            handleResultValidation()
            changePlayer()
            }
    }

    container.addEventListener('click',(e) => action(e.target, e.target.id))
    // Tracking moving player by pressing 'Arrow Right' 
    // or 'ArrowLeft' buttons and making tiles active
    // and play the game
    const playingGame = (e) => {
        if (e.key ==='ArrowRight' && n < 8) {
            tiles[n].classList.remove('active')
            n++
            tiles[n].classList.add('active')
        }
        if (e.key ==='ArrowLeft' && n > 0) {
            tiles[n].classList.remove('active')
            n--
            tiles[n].classList.add('active')
        }
        if (e.key ==='Enter') {
            const eventEnter = new CustomEvent('click');
            tiles[n].dispatchEvent(eventEnter,action(tiles[n],n));
            }
        }

    document.addEventListener('keyup', playingGame)
    // reset game
    resetButton.addEventListener('click', reset)
    function reset (){
        document.location.reload()
    }
}) 


