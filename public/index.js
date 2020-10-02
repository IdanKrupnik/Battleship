
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
createBoard($board2);

function makeBoardReactive(board) {

    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            let cell = board.querySelector('tbody').rows[row].cells[col];
            cell.classList.remove('entry-disabled');
        }
    }
}

function makeBoardUnreactive(board) {

    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            let cell = board.querySelector('tbody').rows[row].cells[col];
            cell.classList.add('entry-disabled');
            cell.removeAttribute('onclick');
        }
    }
}

function removeElementFromDOM(DOMElement) {
    DOMElement.style.display = 'none';
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
    searchOnlineRoom();
}

function waitForPlayerShips(watingTime) {
    const $timer = document.querySelector('.timer');
    const START_TIME = watingTime;
    $timer.innerHTML = START_TIME;

    const $message = document.createElement("div");
    $message.innerHTML = "Please put your ships on the board";
    $message.classList.add('message-alert');
    document.body.insertBefore($message, $timer);

    const interval = setInterval(() => {
        $timer.innerHTML = parseInt($timer.innerHTML) - 1;
        if (parseInt($timer.innerHTML) === 0) {
            clearInterval(interval);
            makeBoardUnreactive($board1);
            makeBoardReactive($board2);
            removeElementFromDOM($message);
        }
    }, 1000);
}

function searchOnlineRoom() {
    const memberId = +document.querySelector('#memberId').innerHTML;

    socket.emit('join', memberId);

    socket.on('roomEstablished', () => {
        console.log('Room Established');
        waitForPlayerShips(20);
    });

    socket.on('opponentSelection', ({ row, col }) => {
        console.log(`Opponent chose ${row}-${col}`);
    })

}