const Board = require('./Board');


class SocketEvent {
    constructor(eventName, handler) {
        this.eventName = eventName;
        this.handler = handler;
    }
}

class RoomManager {
    #rooms;
    #roomIdCounter;
    constructor() {
        this.#rooms = [];
        this.#roomIdCounter = 0;
    }

    //Using the arrow function so that the value
    //of this will not change
    #getNewRoom = (socket, memberId) => {
        const newRoom = {
            roomId: this.#roomIdCounter++,
            full: false,
            members: [memberId],
            player1Socket: socket,
            player2Socket: null
        }

        return newRoom;
    }

    join(socket, memberId) {
        for (let i = 0; i < this.#rooms.length; i++) {
            if (!this.#rooms[i].full) {
                this.#rooms[i].full = true;
                this.#rooms[i].members.push(memberId);
                this.#rooms[i].player2Socket = socket;

                this.#rooms[i].player2Socket
                    .join(this.#rooms[i].roomId);

                this.#rooms[i].player1Socket
                    .to(this.#rooms[i].roomId)
                    .emit('roomEstablished');

                this.#rooms[i].player2Socket
                    .to(this.#rooms[i].roomId)
                    .emit('roomEstablished');

                return;
            }
        }
        const newRoom = this.#getNewRoom(socket, memberId);
        newRoom.player1Socket.join(newRoom.roomId);
        this.#rooms.push(newRoom);
    }

    sendMessageToRoomOfMember(memberId, eventName, message) {
        for (let i = 0; i < this.#rooms.length; i++) {
            if (this.#rooms[i].members.includes(memberId)) {
                this.#rooms[i].player1Socket
                    .to(this.#rooms[i].roomId)
                    .emit(eventName, message);

                if (this.#rooms[i].player2Socket != null) {
                    this.#rooms[i].player2Socket
                        .to(this.#rooms[i].roomId)
                        .emit(eventName, message);
                }
            }
        }
    }

}

class BattleshipRealtimeCommunication {
    #roomManager;

    constructor(socketioInstance, socketEventList) {
        this.socketioInstance = socketioInstance;
        this.registerEvents(socketEventList);
        this.#roomManager = new RoomManager();

    }

    registerEvents(socketEventList) {

        this.socketioInstance.on('connection', (socket) => {

            socket.on('join', (memberId) => {

                this.#roomManager.join(socket, memberId);

            })

            for (let i = 0; i < socketEventList.length; i++) {
                socket.on(socketEventList[i].eventName, (data) => {
                    socketEventList[i].handler(this.#roomManager, data);
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
            new SocketEvent('cellSelected', (roomManager, { row, col, memberId }) => {
                console.log(`User chose position ${row}, ${col}`);
                roomManager.sendMessageToRoomOfMember(memberId, 'opponentSelection', {
                    row: row,
                    col: col
                });
            })
        ]);
    }
}

const battleship = new Battleship();

module.exports = battleship;