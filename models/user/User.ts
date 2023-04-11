import { compare } from "bcryptjs";
import { client } from '../../db/mongoConnection';

class User {
    static saveUser(email, password) {
        const user = client.db().collection('users').insertOne({
            email: email,
            password: password,
        })
    }

    static findUser(email: string) {
        try {
            const user = client.db().collection('users').findOne({
                email: email
            })

            return user

        } catch (error) {
            console.log(error);
        }
    }

    static async validateUser(email: string, password: string) {
        try {
            const user = await client.db().collection('users').findOne({
                email: email
            })

            if (!user) {
                return false
            }

            const passwordMatch = (await compare(password, user.password))
            if (!passwordMatch) {
                return false
            }

        } catch (error) {
            console.log(error);
        }
    }
}


export {
    User
}