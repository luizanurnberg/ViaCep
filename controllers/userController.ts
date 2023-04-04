import { Request, Response } from 'express';
const mongo = require("../db/mongoConnection");
const user = require('../models/User');


class userController {
    async createUser(request: Request, response: Response) {
        const email = request.body.email
        const password = request.body.password
        const userAlreadyExists = await mongo.db().collection('users').findOne({
            email: email
        })

        if (!email || email == " " || email == null ||  !password  || password == " " || password == null) {
            response.status(400).json({ msg: 'É necessário enviar os campos de email e password!' });
        } else
            if (userAlreadyExists) {
                response.status(400).json({ msg: 'Já existe um usuário cadastrado com esse email, tente novamente!' });
            }
            else {
                const newUser = new user(email, password);
                await newUser.saveUser();
                response.status(200).json({ msg: 'Usuário inserido com sucesso! Faça o login com o email e senha para ter acesso ao Token de autenticação' });
            }

    }
}


export {
    userController
}