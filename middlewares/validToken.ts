import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Payload } from '../models/Payload';


function validToken(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({ msg: 'Para realizar a pesquisa, é necessário um token válido!' }).end();
    } else {
        const [, token] = authToken.split(" ");
        try {
            const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
            request.email = sub;
            return next();
        } catch (error) {
            return response.status(401).json({ msg: 'Você não tem permissão para acessar o serviço!' }).end();
        }

    }
}

export {
    validToken
}