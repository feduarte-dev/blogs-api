const { categoryService } = require('../services');

const getCategories = async (_req, res) => {
  try {
    const { status, data } = await categoryService.getCategories();
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { status, data } = await categoryService.addCategory(name);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  addCategory,
};