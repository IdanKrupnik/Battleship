const socket = io();


function cellClickedHandler(rowPosition, colPosition) {

    socket.emit('cellSelected', {
        row: rowPosition,
        col: colPosition
    });
}

