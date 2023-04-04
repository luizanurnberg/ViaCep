import { Router, Request, Response } from 'express';
import { loginUserController } from '../controllers/loginUserController';
import { userController } from '../controllers/userController';
import { viaCep } from '../controllers/viaCepController';
import { validToken } from '../middlewares/validToken';
const router = Router();

/* User's routes */
router.post('/user', new userController().createUser);
router.post('/user/login', new loginUserController().logUser);

router.use(validToken);

/* ViaCep route */
router.post('/user/searchCep', new viaCep().searchCep)

export {
    router
}