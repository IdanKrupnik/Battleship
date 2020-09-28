const mysql = require('mysql2');

module.exports = class MySqlDB {
    //This is a new feature of creating private field in js
    #pool
    constructor(connectionProperties = {
        host: 'localhost',
        user: 'root',
        database: 'battleship',
        password: '7869'
    }) {
        this.#pool = mysql.createPool(connectionProperties);
    }

    executeQuery(queryString, parametersArray) {
        return this.#pool.promise().execute(queryString, parametersArray);
    }

} 