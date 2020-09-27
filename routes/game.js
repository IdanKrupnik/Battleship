const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    const templateParameters = {
        gameTitle: 'Battleship'
    }

    res.render('index', templateParameters);
})

module.exports = router;