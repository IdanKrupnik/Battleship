const express = require('express');
const router = express.Router(); 

const usersModel = require('../models/users');


router.get('/login', (req, res) => {
    const templateParameters = {
        gameTitle: 'Battleship'
    }

    res.render('login', templateParameters);
})


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    usersModel.getUsersInstance().isExist(email, password, (answer => {
        templateParameters = {
            gameTitle: 'Battleship',
            message: 'You are logged in',
            memberId: ''
        }

        req.session.isLoggedIn = true;
        res.render('index', templateParameters);
    }))
    
    
})

module.exports = router;