import { Request, Response } from 'express';
const axios = require('axios');


class viaCep {
    searchCep(request: Request, response: Response) {
        const typedCep = request.body.cep
        const urlConnection = `http://viacep.com.br/ws/${typedCep}/json`

        axios.get(urlConnection).then((response: Response) => {
            const { localidade, uf, logradouro } = response.data
            
        }).catch((error) => {
            response.json({ msg: 'Algo de errado aconteceu, verifique o cep digitado e tente novamente!' });
            console.log(error);
        })
    }
}

export {
    viaCep
}