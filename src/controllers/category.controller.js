const { categoryService } = require('../services');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.addCategory(name);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  addCategory,
  getCategories,
};