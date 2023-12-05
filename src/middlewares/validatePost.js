const { categoryService } = require('../services');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const allCategories = await categoryService.getCategories();

  const isValidCategory = categoryIds.every((categoryId) => allCategories
    .some((category) => category.id === categoryId));

  if (!isValidCategory) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = validatePost;
