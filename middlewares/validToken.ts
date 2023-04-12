import permissionException from '../exceptions/api/permissionException';
import apiRequestException from '../exceptions/api/apiRequestException';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Payload } from '../models/auth/Payload';
import * as dotenv from 'dotenv';

function validToken(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json(permissionException());
    } else {
        const [, token] = authToken.split(" ");
        try {
            dotenv.config();
            const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
            request.email = sub;
            return next();
        } catch (error) {
            return response.status(401).json(apiRequestException());
        }

    }
}

export {
    validToken
}