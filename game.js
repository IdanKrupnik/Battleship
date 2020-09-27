//Core
const path = require('path');

//Custom
const express = require('express');
const users = require('./models/users');
const gameRouter = require('./routes/game');
const loginRouter = require('./routes/login');

const app = express();


const publicDirectoryPath = path.join(__dirname, '/public');
app.use(express.static(publicDirectoryPath));

setTemplatingEngine({
    templateEngineName: 'ejs',
    viewsFolderName: 'views'
});

registerAppRouters([
    gameRouter,
    loginRouter
]);

const usersModel = users.getUsersInstance();
usersModel.getAllUsers()
    .then(users => {
        console.log(users);
    });

const port = 8080;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


function setTemplatingEngine({ templateEngineName = 'ejs', viewsFolderName = 'views' }) {
    app.set('view engine', templateEngineName);
    app.set('views', viewsFolderName);
}

function registerAppRouters(routersArray) {

    if (!Array.isArray(routersArray)) {
        console.log('Method must accept an array');
        return;
    }

    for (let i = 0; i < routersArray.length; i++) {
        app.use(routersArray[i]);
    }
}
