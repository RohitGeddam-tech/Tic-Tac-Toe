const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winning_msg = document.querySelector('[data-winning-text]')
const winning_message = document.getElementById('winning-message')
const restartButton = document.getElementById('restartButton')
const X_class = 'x';
const circle_class = 'circle';
const Win_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click', handleClick, { once: true})
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHover()
    winning_message.classList.remove('show')
}

function handleClick(e){
    console.log('click');
    const cell = e.target
    const currentClass = circleTurn ? circle_class : X_class
    //place mark
    placeMark(cell, currentClass)
    //check for win
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHover()
    }
    //check for draw
    //switch turns

}

function endGame(draw){
    if(draw){
        winning_msg.innerText = 'Draw!'
    }else {
        winning_msg.innerText = `${circleTurn ? "0's" : "X's"} Wins!`
    }
    winning_message.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHover(){
    board.classList.remove(X_class)
    board.classList.remove(circle_class)
    if (circleTurn) {
        board.classList.add(circle_class)
    }else {
        board.classList.add(X_class)
    }
}

function checkWin(currentClass) {
    return Win_combos.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}