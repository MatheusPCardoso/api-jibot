# BotAI

BotAI é um backend desenvolvido com [NestJS](https://nestjs.com/) para gerenciar bots. Este projeto utiliza Docker para facilitar o setup e a execução.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/joaogabrielfragosojardim/botai.git
    cd botai
    ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

    ```env
    DB_TYPE=postgres
    DB_HOST=db
    DB_PORT=5432
    DB_USER=seu-usuario
    DB_PASSWORD=sua-senha
    DB_NAME=seu-banco
    ```

3. Construa e inicie os containers Docker:
    ```bash
    docker-compose up -d
    ```

4. A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Uso

### Gerar uma nova migração
Para gerar uma nova migração, execute o comando:
```bash
yarn run migration:generate db/migrations/NomeDaMigracao
yarn run migration:run
```

Para gerar uma nova migração pelo docker, execute o comando:
```bash
docker-compose exec app yarn run migration:generate db/migrations/NomeDaMigracao
docker-compose exec app yarn run migration:run
```