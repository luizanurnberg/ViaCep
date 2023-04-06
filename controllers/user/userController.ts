import emptyFieldException from '../../exceptions/user/emptyFieldException';
import userAlreadyExistsException from '../../exceptions/user/userAlreadyExistsException';
import somethingWrongException from '../../exceptions/user/somethingWrongException';
import { User } from './../../models/user/User'
import { hash } from "bcryptjs";
import { Request, Response } from 'express';

class userController {
    async createUser(request: Request, response: Response) {
        try {
            const email = request.body.email
            const password = request.body.password
            if (!email || email == " " || email == null || !password || password == " " || password == null) {
                return response.status(400).json(emptyFieldException());
            }

            const userExists = await User.findUser(email);
            if (userExists) {
                return response.status(401).json(userAlreadyExistsException());
            } else {
                const passwordHash = await hash(password, 8);
                User.saveUser(email, passwordHash);
                response.status(200).json({ msg: 'Usuário inserido com sucesso! Faça o login com o email e senha para ter acesso ao Token de autenticação' });
            }

        } catch (error) {
            response.status(400).json(somethingWrongException());
            console.log(error);
        }

    }
}

export {
    userController
}