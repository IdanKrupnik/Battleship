//Core
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');


//Custom
const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');
const battleship = require('./utils/Battleship');
const gameRouter = require('./routes/game');
const loginRouter = require('./routes/login');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

app.use(bodyParser.urlencoded({ extended: false }));

const publicDirectoryPath = path.join(__dirname, '/public');
app.use(express.static(publicDirectoryPath));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));

setTemplatingEngine({
    templateEngineName: 'ejs',
    viewsFolderName: 'views'
});

registerAppRouters([
    gameRouter,
    loginRouter
]);


battleship.startGame(io);

const port = 8080;
httpServer.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


function setTemplatingEngine({ templateEngineName = 'ejs', viewsFolderName = 'views' }) {
    app.set('view engine', templateEngineName);
    app.set('views', viewsFolderName);
}

function registerAppRouters(routersArray) {

    if (!Array.isArray(routersArray)) return;

    for (let i = 0; i < routersArray.length; i++) {
        app.use(routersArray[i]);
    }
}
