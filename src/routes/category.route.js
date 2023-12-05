const route = require('express').Router();

const { categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateCategory = require('../middlewares/validateCategory');

route.post('/', validateToken, validateCategory, categoryController.addCategory);

module.exports = route;