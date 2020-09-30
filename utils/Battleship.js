const Board = require('./Board');


class SocketEvent {
    constructor(eventName, handler) {
        this.eventName = eventName;
        this.handler = handler;
    }
}

class BattleshipRealtimeCommunication {
    constructor(socketioInstance, socketEventList) {
        this.socketioInstance = socketioInstance;
        this.registerEvents(socketEventList);
    }

    registerEvents(socketEventList) {

        this.socketioInstance.on('connection', (socket) => {
            for (let i = 0; i < socketEventList.length; i++) {
                socket.on(socketEventList[i].eventName, (data) => {
                    socketEventList[i].handler(data);
                });
            }
        })

    }
}

class Battleship {
    realtimeCommunicator;
    constructor(boardRowsLength = 10, boardColsLength = 10) {
        this.board1 = new Board('opponent1', boardRowsLength, boardColsLength);
        this.board2 = new Board('opponent2', boardRowsLength, boardColsLength);
    }

    startGame(socketioInstance) {
        this.realtimeCommunicator = new BattleshipRealtimeCommunication(socketioInstance, [
            new SocketEvent('cellSelected', ({ row, col }) => {
                console.log(`User chose position ${row}, ${col}`);
            })
        ]);
    }
}

const battleship = new Battleship();

module.exports = battleship;