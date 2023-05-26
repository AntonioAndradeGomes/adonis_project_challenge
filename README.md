
# Project Challenge Adonis

Este projeto foi feito em Adonis com o objetivo em resolver a parte do backend do desafio técnico descrito neste [documento](doc/Desafio%20t%C3%A9cnico%20-%20pleno%20(1)%20(1).pdf).

Se utilizou o [Insomnia](https://insomnia.rest/products/insomnia) no desenvolvimento da aplicação para testar a API e realizar solicitações HTTP. Por isso tem-se um [arquivo insomnia disponível como documentação](doc/Insomnia_2023-05-26.json). 

## Como executar esse projeto

Neste manual se considerou que a execução desse projeto irá ser feito em localhost e usando do [Docker](https://www.docker.com/) para executar o Postgres.

1. No arquivo [docker-compose.yml](docker-compose.yml) edite as configurações de banco de dados para as que você preferir e execute o comando:

```bash
docker-compose up -d
```

2. Crie um arquivo .env na raiz do projeto com base no arquivo [.env.exemple](.env.example), mas modificando as configurações de banco de dados para as foi colocado no passo anterior.

3. Instale todas as depedências listadas no arquivo [package.json](package.json):
```bash
npm install
```
ou
```bash
yarn
```

4. Execute todas as migrações:
  
```bash
node ace migration:run
```

5. Iniciar o servidor Adonis e o manter em execução:

```bash
node ace serve --watch
```

