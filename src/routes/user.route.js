const route = require('express').Router();

const { userController } = require('../controllers');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

route.post('/', validateUser, userController.createUser);
route.get('/', validateToken, userController.getUsers);

module.exports = route;