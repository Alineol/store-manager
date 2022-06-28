## Projeto Store Manager

**Contexto**

No bloco deste projeto somos apresentados aos conceitos de arquitetura de software em camadas - mais especificamente, a arquitetura MSC (Model, Service e Controller) - e aos padrões de uma API RESTful.


**Objetivo do projeto**

Desenvolver uma API RESTful utilizando a arquitetura MSC e o Mysql para a gestão de dados.
A API a ser construída corresponde a um sistema de gerenciamento de vendas, onde será possível criar,
visualizar, deletar e atualizar produtos e vendas.

**Principais habilidades desenvolvidas nesse trabalho**

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

# Tecnologias utilizadas

- JavaScript
- Mocha
- Chai
- Sinon
- Joi
- Dotenv
- Node.js
- Express.js
- MySQL

### Endpoints disponíveis na aplicação:

* [`POST`] Cadastrar produtos: `/products`;
* [`GET`] Listar produtos: `/products`;
* [`GET`] Listar um produto pelo seu id:`/products/:id`;
* [`PUT`] Atualizar um produto pelo seu id: `/products/:id`;
* [`DELETE`] Remover um produto pelo seu id: `/products/:id`;
* [`POST`] Cadastrar vendas: `/sales`;
* [`GET`] Listar vendas: `/sales`;
* [`GET`] Listar uma venda pelo seu id: `/sales/:id`;
* [`PUT`] Atualizar uma venda pelo seu id: `/sales/:id`;

# Comandos para rodar o projeto na sua máquina

<details>
  <summary><strong>:whale: Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  
  > Para iniciar a aplicação: `npm run dev
  
  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`

  :eyes: **De olho nas dicas:** 
  1. Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  
 > Para iniciar a aplicação: `npm run dev`

</details>
