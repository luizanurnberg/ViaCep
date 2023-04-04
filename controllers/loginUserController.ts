import { sign } from "jsonwebtoken";
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
const mongo = require("../db/mongoConnection");
const userLogin = require('../models/LoginUser');

class loginUserController {
    async logUser(request: Request, response: Response) {
        const email = request.body.email
        const password = request.body.password
        const userExists = await mongo.db().collection('users').findOne({
            email: email
        })

        if (!email || email == " " || email == null || !password || password == " " || password == null) {
            response.status(400).json({ msg: 'É necessário enviar os campos de email e password!' });
        } else
            if (!userExists) {
                response.status(400).json({ msg: 'Não foi possível logar! Tente novamente ou faça um novo cadastro' });
            }
            else {
                const token = sign({email: email}, process.env.JWT_SECRET as string);
                response.status(200).json({token});
                
            }


    }
}

export {
    loginUserController
}