const route = require('express').Router();

const { categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateCategory = require('../middlewares/validateCategory');

route.post('/', validateToken, validateCategory, categoryController.addCategory);
route.get('/', validateToken, categoryController.getCategories);

module.exports = route;