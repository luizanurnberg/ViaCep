# ViaCep
Esta é a documentação para o uso e ensino do CepProject.

# Requisitos
<b>Requisitos Funcionais:</b> <br>
1. O sistema deve manter usuário no banco de dados não relacional<br>
2. O sistema não deve permitir que seja incluído dois usuários com o mesmo e-mail <br>
3. O sistema deve disponibilizar a localidade em escrito do CEP pesquisado <br>
4. O sistema deve armazenar o cep digitado e a resposta da requisição no cache por 5 minutos<br>

<b>Requisitos Não Funcionais:</b> <br>
1. O sistema deverá integrar com o Webservice ViaCep <br>
2. O sistema permitirá buscar pelo CEP apenas se o usuário estiver logado <br>
3. A linguagem do sistema deverá ser de fácil compreensão <br>

<b>Regras de Negócio:</b> <br>
1. O cadastro/login do usuário não será finalizado caso algum campo esteja nulo  <br>
2. O sistema não permitirá a requisição ao site da viaCep caso o token do usuário seja inválido <br>
3. O sistema mostrará se os dados do cep vieram diretamente da requisição ou por meio do cache <br>

<u><b>Referências</b></u>
https://viacep.com.br/

# Classes implementadas

<b>Models</b> <br>
1. User - Define os campos para o cadastro do usuário, faz a conexão com o MongoDB para busca e registro de dados<br>
2. Payload - Define os campos que serão posteriormente validados no middleware do token<br>

<b>Controllers</b> <br>
1. userController - é partir desse controller e em conjunto do Model, que o usuário será cadastrado<br>
2. loginUserController - validará o login do usuário, caso esteja conforme as regras definidas, o controller retornará o token do respectivo usuário<br>
3. viaCepController - é nesse controller que é feita a requisição ao site da viaCep, aqui também está armazenado o cache<br>

<b>Exceptions</b> <br>
1. 
2. 

<b>MongoDB</b> <br>
1. 
2. 

<b>Routes</b> <br>
1. 
2. 

<b>Middlewares</b> <br>
1. 
2. 


# Testes
