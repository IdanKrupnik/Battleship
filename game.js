//Core
const path = require('path');

//Custom
const express = require('express');
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


const port = 8080;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


function setTemplatingEngine({templateEngineName = 'ejs', viewsFolderName = 'views'}) {
    app.set('view engine', templateEngineName);
    app.set('views', viewsFolderName);
}

function registerAppRouters(routersArray) {
    for(let i = 0; i < routersArray.length; i++) {
        app.use(routersArray[i]);
    } 
}
