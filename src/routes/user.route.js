const route = require('express').Router();

const { userController } = require('../controllers');
const validateUser = require('../middlewares/validateUser');

route.post('/', validateUser, userController);

module.exports = route;