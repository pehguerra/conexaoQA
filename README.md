# ConexaoQA
## _Crie um perfil/portfolio de QA, compartilhe posts e obtenha ajuda de outros QAs_

Aplicação para criar perfis de QA, compartilhar e postar dúvidas, dicas, vagas, ou qualquer assunto da área de qualidade de software.

- Crie seu perfil
- Adicione suas redes sociais
- ✨ Interaja com a comunidade ✨

## Funcionalidades

- Registrar usuário com senhas criptografadas
- Login via JWT (JSON Web Token)
- Criar perfil de usuário com experiências profissionais, formações acadêmicas e redes sociais
- Integração com GitHub para exibir os últimos 5 repositórios
- Postar dúvidas/sugestões/perguntas ou qualquer iteração com a comunidade de QA
- Like/Unlike em posts
- Criar threads de conversas em posts
- áginação de posts e comentários a partir de 7 posts

___
## Tech

![](https://i.ibb.co/ry8sGD3/mern.png)

**MERN** - MongoDB, Express, React JS, Node.js

## Instalação

### Online
Caso não queira instalar a aplicação local, acesse o [ConexaoQA](https://conexaoqa.herokuapp.com/) publicado no Heroku.

### Local

Instalar o [Node.js](https://nodejs.org/en/download/)

Versão utilizada no desenvolvimento:
- Node: 14.15.1,
- npm: 7.5.2

Clonar o projeto:

```sh
git clone https://github.com/pehguerra/conexaoQA.git
```

Navegar para pasta do projeto e instalar as dependências do back-end:

```sh
cd conexaoQA
npm install
```

Navegar para pasta client e instalar as dependências do front-end:

```sh
cd client
npm install
```

Dentro do projeto, criar as variáveis de ambiente:
- Dentro da pasta config criar o arquivo dev.js
- dev.js:

```javascript
module.exports = {
    mongoURI: "",
    jwtSecret: "",
    githubClientId: "",
    githubSecret: ""
}
```
- **mongoURI:** Criar um cluster online gratuíto no [mongoURI](https://www.mongodb.com/cloud/atlas). Depois de criado, pegar a string de conexão que deve ser algo parecido com:
`mongodb+srv://<username>:<password>@clusterName.f03bhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
- **jwtSecret:** Pode ser qualquer palavra, frase. Esse valor é utilizado pelo JWT para gerar um token
- **githubClientId:** Gerar um OAuth App dentro do [GitHub](http://github.com/), selecionando Settings -> Developer Settings -> OAuth Apps. HomepageURL e Authorization callback URL que são pedidos na hora da criação das chaves pode ser `http://localhost:3000`
- **githubSecret:** Gerada junto com o githubClientId

Por fim, iniciar a aplicação a partir da pasta raiz do projeto, mesma pasta que foi instalada as dependências do back-end:
```sh
cd ..
npm run dev
```

##### URLs

`http://localhost:3000/` -> Aplicação ConexãoQA

`http://localhost:5000/` -> Servidor backend (APIs)

`http://localhost:5000/api-docs/` -> Documentação APIs REST - Swagger
