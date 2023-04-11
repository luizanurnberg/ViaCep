import invalidRouteException from './exceptions/api/404Exception';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes/router';
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(function (request: Request, response: Response, next: NextFunction) {
    response.status(404).json(invalidRouteException());
})

app.listen(port, () => {
    console.log('Aplicação rodando!');
})