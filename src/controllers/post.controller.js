const jwt = require('jsonwebtoken');
const { postService } = require('../services');

const getUserId = async (authorization) => {
  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  return decoded.data.userId;
};

const addPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const userId = await getUserId(authorization);
    const post = await postService.addPost(title, content, categoryIds, userId);
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { title, content } = req.body;
    const userId = await getUserId(authorization);
    const post = await postService.getPostById(id);

    if (userId !== post.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    
    await postService.updatePost(id, title, content);
    
    const updatedPost = await postService.getPostById(id);
    
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  addPost,
  updatePost,
};