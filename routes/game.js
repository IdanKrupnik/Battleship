const express = require('express');
const router = express.Router(); 

class Members {
    static #idCounter = 0;

    static getMemberId() {
        return this.#idCounter++;
    }
}

router.get('/', (req, res) => {
    const templateParameters = {
        gameTitle: 'Battleship',
        message: '',
        foundOpponent: false,
        memberId: Members.getMemberId()
    }

    res.render('index', templateParameters);
})

module.exports = router;