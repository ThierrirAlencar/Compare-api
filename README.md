# Compare API
Compare é um serviço completo de Scrapping de produtos e ferramentas voltados para a informática. Este midleware possui o 
objetivo de interligar o serviço de coleta de dados da ferramenta com o frontEnd através de um código robusto e escalável. 

# Features

- Api completa de retorno de dados e comparação de preços
- Sistema de Login e Cadastro
- Caching de dados usando servidor Redis
- Padronização de Logs usando o Winston
- Padronização de Erros através de pipelines do NestJS
- Pipeline CI/CD com Git Actions


# Setup

1. Clone o repositório 
```bash
$ git clone https://github.com/ThierrirAlencar/Compare-api.git
```

2. Instale as dependencias
```bash
$ npm install --force
```

3. rode o projeto
```bash
$ npm run start
```
## Rodando a partir do docker

Subir a imagem (opcional)
```bash
$ docker compose build --no-cache compareapi
```
Criar o conteiner da aplicação
```bash
$ docker compose up --build
```


