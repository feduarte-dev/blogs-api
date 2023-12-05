const route = require('express').Router();
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const { postController } = require('../controllers');

route.post('/', validateToken, validatePost, postController.addPost);
route.get('/', validateToken, postController.getPosts);

module.exports = route;