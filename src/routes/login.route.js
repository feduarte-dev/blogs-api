const route = require('express').Router();

const { loginController } = require('../controllers');
const validateLogin = require('../middlewares/validateLogin');

route.post('/', validateLogin, loginController);

module.exports = route;