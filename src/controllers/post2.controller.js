const { postService } = require('../services');
const getUserFromToken = require('../utils/getUserFromToken');

const getPosts = async (_req, res) => {
  try {
    const { status, data } = await postService.getPosts();
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
  
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await postService.getPostById(id);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { userId } = await getUserFromToken(authorization);
    const { status, data } = await postService.deletePost(id, userId);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getPosts,
  getPostById,
  deletePost,
};