import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes/router';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(function (request: Request, response: Response, next: NextFunction) {
    response.status(404).json({ msg: 'Você tentou acessar uma rota inválida!'})
})

app.listen(3000, () => {
    console.log('Aplicação rodando!');
})