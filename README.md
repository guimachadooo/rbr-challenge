# RBR-Challenge

![Next](https://img.shields.io/badge/next.js-%23ED8B00.svg)
![Chakra-UI](https://img.shields.io/badge/chakra-ui-%236DB33F.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%23316192.svg)

Esse é um desafio dado pela RBR Digital feito em [Next.js](https://nextjs.org/).

Uma dashboard com um crud de funcionários, com busca e ordenação de registros. Esse projeto utiliza:
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para carregar a fonte Inter do Google Fonts;
- [`mongoose`](https://www.mongodb.com/) para executar uma instância de banco de dados como exemplo;
- [`axios`](https://axios-http.com/ptbr/docs/intro) para realizar as requisições de API Rest;
- [`tanstack-query/tanstack-table`](https://tanstack.com/) para agilizar a manipulação dos dados;
- [`moment`](https://momentjs.com/) para tratamento de datas;
- [`chakra-ui`](https://v2.chakra-ui.com/) como biblioteca UI de componentes para construir a interface.


## Conteúdo

- [Instalação](#instalação)
- [Como Iniciar](#como-iniciar)
- [API Endpoints](#api-endpoints)
- [Contribuição](#contribuição)

## Instalação

1. Clone o repositório com:

```bash
git clone https://github.com/guimachadooo/rbr-challenge.git
```

2. Instale as dependências com:
```bash
npm install
```

3. Instale a versão 20.10.0 do Node.js:
```bash
nvm install 20.10.0
nvm use 20.10.0
```

## Como iniciar

1. Inicie a aplicação com:
```bash
npm run dev
```
2. Ela estará disponível em http://localhost:3000


## API Endpoints
A API possui os seguintes endpoints:

```markdown
- GET /api/employees - Recupera todos os funcionários.
- GET /api/employees/:id - Recupera um único funcionário pelo ID.
- POST /api/employees - Cria um novo funcionário.
- PUT /api/employees/:id - Atualiza um funcionário pelo ID.
- DELETE /api/employees/:id - Exclui um funcionário pelo ID.
```

## Contribuição

Demo disponível [nesse link](https://rbr-challenge.vercel.app/)

Contribuições são bem vindas! Se você tiver algum problema ou sugestão de melhoria, abra uma issue ou um pull request para o repositório.

Siga as [convenções pré definidas](https://www.conventionalcommits.org/en/v1.0.0/), e abra as edições em uma branch separada.

Feito com ❤️ - [@guimachadoo](https://linkedin.com/in/guimachadoo)