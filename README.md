# ViaCep
Esta é a documentação para o uso e ensino do CepProject.

# Requisitos
<b>Requisitos Funcionais:</b> <br>
1. O sistema deve manter usuário; <br>
2. O sistema não deve permitir que seja incluído dois usuários com o mesmo e-mail; <br>
3. O sistema deve disponibilizar a localidade em escrito do CEP pesquisado; <br>
4. O sistema deve armazenar o cep digitado e a resposta da requisição no cache por 5 minutos.<br>

<b>Requisitos Não Funcionais:</b> <br>
1. O sistema deverá integrar com o Webservice ViaCep; <br>
2. O sistema permitirá buscar pelo CEP apenas se o usuário estiver logado; <br>
3. A linguagem do sistema deverá ser de fácil compreensão. <br>

<b>Regras de Negócio:</b> <br>
1. O cadastro/login do usuário não será finalizado caso algum campo esteja nulo;  <br>
2. O sistema não permitirá a requisição ao site da viaCep caso o token do usuário seja inválido; <br>
3. O sistema mostrará se os dados do cep vieram diretamente da requisição ou por meio do cache. <br>

<u><b>Referências</b></u>

       https://viacep.com.br/

# Modelo de classes implementadas

<b>Models</b> <br>
-  User - Define os campos para o cadastro do usuário, faz a conexão com o MongoDB para busca e registro de dados<br>
-  Payload - Define os campos que serão posteriormente validados no middleware do token<br>

<b>Controllers</b> <br>
-  userController - é partir desse controller e em conjunto do Model, que o usuário será cadastrado<br>
-  loginUserController - validará o login do usuário, caso esteja conforme as regras definidas, o controller retornará o token do respectivo usuário<br>
-  viaCepController - aqui é feita a requisição ao site da viaCep e também é onde está armazenado o cache<br>


<b>MongoDB</b> <br>
-  mongoConnection - realizará a conexão com o banco de dados não relacional de acordo com a uri credencial definida


<b>Routes</b> <br>
-  routes - responsável por armazenar os três tipos de rotas disponíveis 
  
        /user - será responsável por chamar o controller de criação de usuário
        /user/login - será responśavel por logar o usuário e fazer as devidas validações conforme o controller
        /searchCep - será responsável por realizar a requisição ao ViaCep conforme o controller definido para a api

<b>Middlewares</b> <br>
-  validToken - este middleware valida o token passado no header da requisição da rota 'searchCep'. Ficando responsável por validar sua veracidade.

# Detalhamento do sistema 
<h2><b>Manter usuário </b> <br> </h2>

Pré-condições:
1. Ter realizado corretamente as configurações de ambiente; 
2. Possuir internet.

Fluxo básico:
1. O usuário acessa o Insomnia ou Postman para testes; 
2. O usuário acessa a rota definida para o cadastro;
3. O usuário digita corretamente os dados de e-mail e senha; 
4. O usuário clica em 'send' para enviar as informações por meio da requisição;
5. O sistema retorna a success MSG010 e salva o usuário no banco de dados. 

Fluxo de exceção: 

(E1) Exceção ao passo 4 - Dados já existentes;
1. O usuário insere um e-mail já cadastrado anteriormente; 
2. O sistema retorna a exception MSG007.
		
(E2) Exceção ao passo 4 - Campos vazios;
1. O usuário não inseriu o email ou senha; 
2. O sistema retorna a exception MSG004.

-------------------------------------
<h2><b>Realizar login</b> <br> </h2>

Pré-condições:
1. Ter realizado corretamente as configurações de ambiente; 
2. Possuir internet;
3. Ter um cadastro válido no sistema. 

Fluxo básico:
1. O usuário acessa o Insomnia ou Postman para testes; 
2. O usuário acessa a rota definida para o login;
3. O usuário digita o email e a senha referente ao seu cadastro;
4. O sistema retorna o token de autenticação.

Fluxo de exceção: 

(E1) Exceção ao passo 3 - Dados não existentes
1. O usuário insere um e-mail que o sistema não possui registro;
2. O sistema retorna a exception MSG005.

(E2) Exceção ao passo 3 - Email ou senha inválidos
1. O usuário digita o email ou senha errados; 
2. O sistema retorna a exception MSG005.
		
(E3) Exceção ao passo 3 - Campos vazios
1. O usuário não inseriu o email ou senha; 
2. O sistema retorna a exception MSG004.       
-------------------------------------
<h2><b>Requisitar informações sobre o cep</b> <br> </h2>

Pré-condições:
1. Ter realizado corretamente as configurações de ambiente; 
2. Possuir internet;
3. Ter um cadastro válido no sistema; 
4. Possuir o token no header da requisição.

Fluxo básico:
1. O usuário acessa o Insomnia ou Postman para testes; 
2. O usuário acessa a rota definida para a consulta;
3. O usuário digita o cep que deseja consultar; 
4. O sistema realiza a busca das informações na api;
5. O sistema retorna as informações obtidas. 

Fluxo de exceção: 

(E1) Exceção ao passo 3 - Token inválido
1. O usuário insere um token inválido; 
2. O sistema retorna a exception MSG003.

(E2) Exceção ao passo 3 - Dados inesperados 
1. O usuário digita o cep errado; 
2. O sistema retorna a exception MSG002.
		
(E3) Exceção ao passo 3 - Campos vazios
1. O usuário não inseriu o cep;
2. O sistema retorna a exception MSG002.  

Fluxo alternativo:
(A1) Alternativo ao passo 4 - O usuário pesquisa o mesmo cep dentro do intervalo de 5 minutos 
1. O usuário digita o mesmo cep dentro do intervalo de 5 minutos; 
2. O sistema não realiza a busca das informações na api; 
3. O sistema retorna as informações armazenadas no cache. 

# Configuração de ambiente 
-  É necessário ter o redis configurado na porta padrão, para isso, utilizar os comandos abaixo<br>
      
        - docker pull redis
      
        - docker run --name redis13 -p 6379:6379 -d redis redis-server --appendonly no

-  É necessário possuir o MongoDB instalado e de preferência com alguma interface (Mongo Compass) para melhor visualização das collections<br>
-  Para testar as rotas, utilizar Insomnia ou Postman, uma vez que o código não possui FrontEnd<br>
-  Ao rodar o comando abaixo, o sistema apresentará a mensagem "Aplicação rodando!" e "Conectado ao MongoDB!", significando que está pronto para testar<br>

        - npm run start


# Mensagens esperadas
<b>Exceptions</b> <br>

(MSG001)
-  invalidRouteException - a mensagem é disparada quando o usuário tenta acessar uma rota não prevista pelo sistema

         'Você tentou acessar uma rota inválida!'

(MSG002)
-  apiRequestException - a mensagem é disparada quando há algum problema na requisição no ViaCep, site está fora ou o usuário digitou inválido 

         'Algo de errado aconteceu, verifique o cep digitado e tente novamente!'
         
(MSG003)      
-  permissionException - a mensagem é disparada no momento da validação do token do usuário, em casos que não tenha nenhum registro com aquela informação

         'Você não tem permissão para acessar o serviço!'

(MSG004)
-  emptyFieldException - a mensagem é disparada quando o usuário deixa de preencher algum campo necessário no cadastro ou login 

         'É necessário enviar os campos de email e password!' 
         
(MSG005)       
-  invalidUserException - a mensagem é disparada quando um usuário inexistente no banco de dados tenta logar na aplicação ou quando as informações de e-mail e senha não estão conforme as cadastradas anteriormente 

         'Usuário ou senha inválidos, tente novamente ou realize seu cadastro!'
         
(MSG006)         
-  somethingWrongException - mensagem padrão do sistema normalmente acompanhada de um "console.log", com a finalidade de mostrar que o erro veio do código e não da requisição

         'Algo de errado aconteceu, verifique o cep digitado e tente novamente!'
         
(MSG007)      
-  userAlreadyExistsException - a mensagem é disparada quando o usuário tenta cadastrar um novo registro com um email já existente no banco de dados

         'Já existe um usuário cadastrado com esse email, tente novamente!
 ---------------------------
 
<b>Success</b> <br>
- Mensagens e logs de sucesso esperados pelo sistema: 

         (MSG008)
         'Aplicação rodando!'
         
         (MSG009)
         'Conectado ao MongoDB!'
         
         (MSG010)
         'Usuário inserido com sucesso! Faça o login com o email e senha para ter acesso ao Token de autenticação'
	 
# Estrutura de dados

Abaixo estão listados os dados esperados em cada rota:

Cadastro de usuário 

	  - email: string
	  
	  - password: string
	  
Login de usuário

	  - email: string
	  
	  - password: string
	  
Consulta de Cep

	  - cep: string
	  
	  - token: Bearer da requisição
