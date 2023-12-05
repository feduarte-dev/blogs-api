const express = require('express');

const { loginRoute, userRoute, categoryRoute, postRoute } = require('./routes');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

// quando usar a variavel do require entre {} e quando usar puro? sei que qdo é feito module.exports dentro de um objeto o require é entre {} mas e os outros casos?
// não entendo o models.index.js
// pq na criacao da model, ao colocar os parametros sequelize e datatypes, o vscode importa desnecessariamente eles?
// fiz uma validacao puxando a service, devo trocar o lugar da validacao pra nao puxa-la?
// o map de post service é valido?

// nao entendi a aplicabilidade de: const teste = (categories) => Category.findAndCountAll({
//   where: { id: categories },
//   offset: 0,
//   limit: 10,
// });