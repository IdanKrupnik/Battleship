
//TODO: create a board class
//TODO: create a submarine class

const $board = document.querySelector('table#board');

function setBoardStyles()
{
    for(let rowIndex = 0; rowIndex < $board.rows.length; rowIndex++){
        for(let cellIndex = 0; cellIndex < $board.rows[rowIndex].cells.length; cellIndex++) {
            if(cellIndex % 2 === 0) 
                $board.rows[rowIndex].cells[cellIndex].classList.add('entry__black');
            else 
                $board.rows[rowIndex].cells[cellIndex].classList.add('entry__white');
            
        }
    }
}

function initBoard()
{
    
    setBoardStyles();
    //placeSubmarinesOnBoard()
} 

initBoard();