# Projeto VExpenses

## 🚀 Começando

Este é um projeto [Next.js](https://nextjs.org) inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra http://localhost:3000 no seu navegador para ver o resultado.

Você pode começar a editar a página modificando o arquivo app/page.tsx. A página será atualizada automaticamente conforme você edita o arquivo.

Este projeto usa next/font para otimizar e carregar automaticamente a fonte Geist, uma nova família de fontes da Vercel.

## Learn More
Para aprender mais sobre o Next.js, confira os seguintes recursos:

Documentação do Next.js - aprenda sobre os recursos e APIs do Next.js.
Learn Next.js - um tutorial interativo sobre o Next.js.
Você pode conferir o repositório GitHub do Next.js - seus feedbacks e contribuições são bem-vindos!

## Deploy no Vercel
A maneira mais fácil de fazer o deploy do seu aplicativo Next.js é usar a Plataforma Vercel, criada pelos desenvolvedores do Next.js.

Confira nossa documentação de deploy do Next.js para mais detalhes.

## 📋 Pré-requisitos

* [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
* [PNPM](https://pnpm.io/) - Gerente de dependência

## 🛠️ Dependências
Este projeto usa as seguintes tecnologias e bibliotecas:

* [Next.js](https://nextjs.org/) - Framework web usado
* [React Hook Form](https://react-hook-form.com/) - Biblioteca para gerenciamento de formulários
* [Yup](https://github.com/jquense/yup) - Biblioteca de validação de esquema para JavaScript
* [Axios](https://axios-http.com/) - Cliente HTTP baseado em Promises
* [JSON-Server](https://github.com/typicode/json-server) - Mock API para desenvolvimento rápido
* [ESLint](https://eslint.org/) - Ferramenta de linting para garantir a qualidade do código
* [Prettier](https://prettier.io/) - Formatador de código

## 🔍 API ViaCEP

Este projeto usa a API ViaCEP para buscar dados de endereço através do CEP. Você pode fazer uma solicitação para obter informações de endereço com base no código postal, como mostrado abaixo:

```bash
import axios from 'axios';

async function fetchAddressByCEP(cep) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
}

```

---
⌨️ com ❤️ por [Thiago Kazuya](https://github.com/Kazuya08) 😊