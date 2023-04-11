import apiRequestException from '../../exceptions/api/apiRequestException';
import { Request, Response } from 'express';
import { createClient } from 'redis';
import axios, { AxiosError } from 'axios';

class viaCep {
    async searchCep(request: Request, response: Response) {
        const typedCep = request.body.cep;
        const urlConnection = `http://viacep.com.br/ws/${typedCep}/json`
        const client = createClient();
        await client.connect();
        const DEFAULT_EXPIRATION = 300;

        const cepRedis = await client.get(`viacep|${typedCep}`);
        if (cepRedis) {
            console.log('cache hit');
            return response.json(JSON.parse(cepRedis));
        }

        axios.get(urlConnection).then((res) => {
            const data = res.data
            client.setEx(`viacep|${typedCep}`, DEFAULT_EXPIRATION, JSON.stringify(data));
            console.log("cache miss");
            return response.status(200).json(data);
           

        }).catch((error) => {
            console.log(error);
            return response.status(400).json(apiRequestException())
        })

    }
}

export {
    viaCep
}