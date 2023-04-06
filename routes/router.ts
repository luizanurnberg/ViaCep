import { Router, Request, Response } from 'express';
import { loginUserController } from '../controllers/user/loginUserController';
import { userController } from '../controllers/user/userController';
import { viaCep } from '../controllers/api/viaCepController';
import { validToken } from '../middlewares/validToken';

const router = Router();
/* User's routes */
router.post('/user', new userController().createUser);
router.post('/user/login', new loginUserController().logUser);

/* Middleware for token */
router.use(validToken);

/* ViaCep route */
router.post('/searchCep', new viaCep().searchCep)

export {
    router
}