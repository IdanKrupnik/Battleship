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

    isExist(email, password, callback) {

        this.#database.executeQuery('SELECT * FROM users WHERE email = ? AND password = ?', [email, password])
            .then(result => {
                const isExist = result[0].length > 0 ? true : false;

                callback(isExist);

            })
            .catch(err => {
                console.log(err);
            })

    }
}

//Implementing singleton pattern
const usersModel = new Users();

module.exports = {
    getUsersInstance() {
        return usersModel;
    }
}