
const $board1 = document.querySelector('table#board1');
const $board2 = document.querySelector('table#board2');

const MAX_ROWS = 10;
const MAX_COLS = 10;

function createBoard(board) {
    for (let row = 0; row < MAX_ROWS; row++) {
        let newRow = board.querySelector('tbody').insertRow(row)
        for (let col = 0; col < MAX_COLS; col++) {
            let newCell = newRow.insertCell(col);
            newCell.classList.add(`board__entry`);
            newCell.classList.add(`entry-${row}-${col}`);
            newCell.classList.add('entry-disabled');
            newCell.setAttribute('onclick', `cellClickedHandler(${row + 1}, ${col + 1})`);
        }
    }
}

createBoard($board1);

if($board2) createBoard($board2);
//When the game starts there is only 1 board and its 
//position will be centered
else document.querySelector('.flex-container-col').style.margin = "0 auto";

function makeBoardReactive(board) {

    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            let cell = board.querySelector('tbody').rows[row].cells[col];
            cell.classList.remove('entry-disabled');
        }
    }
}

const socket = io();

function cellClickedHandler(rowPosition, colPosition) {

    socket.emit('cellSelected', {
        row: rowPosition,
        col: colPosition,
        memberId: +document.querySelector('#memberId').innerHTML
    });
}

function startGame() {
    makeBoardReactive($board1);
    if($board2) makeBoardReactive($board2);

    const memberId = +document.querySelector('#memberId').innerHTML;

    socket.emit('join', memberId);

    socket.on('roomEstablished', () => {
        console.log('Room Established');
    });

    socket.on('opponentSelection', ({row, col}) => {
        console.log(`Opponent chose ${row}-${col}`);
    })
    
}
