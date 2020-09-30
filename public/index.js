
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

function startGame() {
    makeBoardReactive($board1);
    makeBoardReactive($board2);
}
