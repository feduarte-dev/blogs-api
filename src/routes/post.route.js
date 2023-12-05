const route = require('express').Router();
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const validateUpdate = require('../middlewares/validateUpdates');
const { postController, post2Controller } = require('../controllers');

route.put('/:id', validateToken, validateUpdate, postController.updatePost);
route.get('/:id', validateToken, post2Controller.getPostById);
route.post('/', validateToken, validatePost, postController.addPost);
route.get('/', validateToken, post2Controller.getPosts);

module.exports = route;