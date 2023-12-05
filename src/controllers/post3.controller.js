const { postService } = require('../services');

const searchPosts = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const allPosts = await postService.getPosts();
    return res.status(200).json(allPosts);
  }
  const posts = await postService.searchPosts(q);
  return res.status(200).json(posts);
};

module.exports = {
  searchPosts,
};