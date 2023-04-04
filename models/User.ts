const mongo = require("../db/mongoConnection");

class User {
    email: String;
    password: String;

    constructor(email, password) {
        this.email = email
        this.password = password
    }

    saveUser() {
        const user = mongo.db().collection('users').insertOne({
            email: this.email,
            password: this.password,
        })
    }
}

module.exports = User