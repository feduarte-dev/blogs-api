const express = require('express');

const { loginRoute, userRoute, categoryRoute } = require('./routes');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

// quando usar a variavel do require entre {} e quando usar puro? sei que qdo é feito module.exports dentro de um objeto o require é entre {} mas e os outros casos?
// não entendo o models.index.js
// passou no teste mas o retorno do post categories esta com id null
// pq na criacao da model, ao colocar os parametros sequelize e datatypes, o vscode importa desnecessariamente eles?
