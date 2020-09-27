const express = require('express');
const router = express.Router(); 


router.get('/login', (req, res) => {
    const templateParameters = {
        gameTitle: 'pageTitle'
    }

    res.render('login', templateParameters);
})

module.exports = router;