const jwt = require('jsonwebtoken');
const { postService } = require('../services');

const getUserId = async (authorization) => {
  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  return decoded.data.userId;
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};
  
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const userId = await getUserId(authorization);
    const post = await postService.getPostById(id);
   
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    if (userId !== post.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    await postService.deletePost(id);
  
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};
module.exports = {
  getPosts,
  getPostById,
  deletePost,
};