import emptyFieldException from "../../exceptions/user/emptyFieldException";
import somethingWrongException from "../../exceptions/user/somethingWrongException";
import invalidUserException from "../../exceptions/user/invalidUserException";
import { sign } from "jsonwebtoken";
import { Request, Response } from 'express';
import { User } from './../../models/user/User'
import * as dotenv from 'dotenv';

class loginUserController {
    async logUser(request: Request, response: Response) {
        try {
            const email = request.body.email
            const password = request.body.password
            if (!email || email == " " || email == null || !password || password == " " || password == null) {
                return response.status(400).json(emptyFieldException());
            }

            const user = await User.validateUser(email, password);
            if (user == false) {
                return response.status(401).json(invalidUserException());
            } else {
                dotenv.config();
                const token = sign({ email: email }, process.env.JWT_SECRET as string);
                response.status(200).json({ token });
            }

        } catch (error) {
            response.status(400).json(somethingWrongException());
            console.log(error);
        }

    }
}

export {
    loginUserController
}