const { postService } = require('../services');

const searchPosts = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await postService.searchPosts(q);
  return res.status(status).json(data);
};

module.exports = {
  searchPosts,
};