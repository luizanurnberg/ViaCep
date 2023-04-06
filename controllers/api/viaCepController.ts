import apiRequestException from '../../exceptions/api/apiRequestException';
import { Request, Response } from 'express';
import { createClient } from 'redis';

class viaCep {
    async searchCep(request: Request, response: Response) {
        const typedCep = request.body.cep;
        const urlConnection = `http://viacep.com.br/ws/${typedCep}/json`
        const client = createClient();
        await client.connect();
        const DEFAULT_EXPIRATION = 300;
        const cepRedis = await client.get(`viacep|${typedCep}`);

        try {
            fetch(urlConnection)
                .then(response => response.json())
                .then(json => {
                    if (cepRedis) {
                        response.json(JSON.parse(cepRedis));
                        console.log("cache hit");
                    } else {
                        client.setEx(`viacep|${typedCep}`, DEFAULT_EXPIRATION, JSON.stringify(json));
                        console.log("cache miss");
                        return response.status(200).json(json);
                    }
                })
        } catch (error) {
            response.status(400).json(apiRequestException());
            console.log(error);
        }

    }

}

export {
    viaCep
}