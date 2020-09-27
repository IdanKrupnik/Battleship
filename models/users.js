const MySqlDB = require('../utils/database');

class Users {
    #database;
    constructor() {
        this.#database = new MySqlDB();
    }

    getAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.#database.executeQuery('SELECT * FROM users')
                const users = result[0];

                resolve(users);
            }
            catch
            {
                reject('Unable to execute the query');
            }

        })
    }

    addUser(user) {

    }

    deleteUser(userId) {

    }

    updateUser(user) {

    }
}

//Implementing singleton pattern
const usersModel = new Users();

module.exports = {
    getUsersInstance() {
        return usersModel;
    }
}