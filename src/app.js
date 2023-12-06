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

// 1- Quando usar a variável do require entre {} e quando usar puro? sei que quando é feito module.exports dentro de um objeto o require é entre {} mas e os outros casos?
// 2- Não entendo o models.index.js
// 3- Por que na criação da model, ao colocar os parâmetros sequelize e datatypes, o vscode os importa desnecessariamente?
// Fiz uma validação puxando a service, isso não está dentro de boas práticas?
// O map de post service é válido?
// fiz validacoes no controller, ta errado/
// Nãoo entendi a aplicabilidade de:
// const teste = (categories) => Category.findAndCountAll({
//   where: { id: categories },
//   offset: 0,
//   limit: 10,
// });