# Brydge Transactional API

## O que é isto

Este é um projeto de API e Portal solicitado pela Brydge como um teste. O projeto permite levantar uma API simples para simular o processamento e conciliação de transações de clientes, calculando o valor em dólar de cada transação e realizando a concliação para o lojista.

## Como usar isto

Antes de poder usar este projeto, certifique-se de ter as seguintes dependências instaladas em seu sistema:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

Crie uma cópia do arquivo `.env.sample` e renomeie-o para `.env`. Este projeto necessita de uma conexão de leitura e escrita para um banco MySQL, e você precisará configurar a conexão no arquivo `.env` que você criou pela cópia do exemplo. Exemplo:

```env
PORT=7000

FINANCE_API_URL = https://api.hgbrasil.com

TYPEORM_CONNECTION = mysql
TYPEORM_HOST = localhost
TYPEORM_USERNAME = admin
TYPEORM_PASSWORD = admin
TYPEORM_DATABASE = brydge
TYPEORM_PORT = 3306
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = false
TYPEORM_ENTITIES = src/entity/**/*.ts
TYPEORM_SEEDING_SEEDS = src/entity/seeders/**/*.ts
```

Após configurar a conexão com o banco, certifique-se de que o banco está criado e vazio (no caso do exemplo, `brydge`).
Execute `yarn install` para instalar as dependências.
Em seguida, execute `npm run start:new`. Este comando irá reiniciar o banco, colocar alguns valores como seed para testes e executar a API de transações.
Sempre que você quiser executar a API com a base reiniciada, execute o mesmo comando novamente. Caso queira executar a API mantendo a base atual, execute `npm start`.

## Experimentando a API

A API possui dois endpoints para serem executados, cada um com suas operações específicas.
Você pode navegar pelas operações disponíveis na API usando a interface do Swagger.
Considerando que você configurou a variável de ambiente `PORT` para `7000`, por exemplo, a interface do Swagger pode ser acessada em `http://localhost:7000/swagger`.


## Coisas que podem ser implementadas

- Autenticação
- Portal
- Atualização automática dos schemas do swagger ao alterar o código