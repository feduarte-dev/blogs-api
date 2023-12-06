const route = require('express').Router();
const { postReadController, postTransformController } = require('../controllers');
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const validateUpdate = require('../middlewares/validateUpdates');

route.get('/search', validateToken, postReadController.searchPosts);
route.delete('/:id', validateToken, postTransformController.deletePost);
route.put('/:id', validateToken, validateUpdate, postTransformController.updatePost);
route.get('/:id', validateToken, postReadController.getPostById);
route.post('/', validateToken, validatePost, postTransformController.addPost);
route.get('/', validateToken, postReadController.getPosts);

module.exports = route;