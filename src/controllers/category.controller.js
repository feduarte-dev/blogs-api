const { categoryService } = require('../services');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.addCategory(name);
    console.log(newCategory);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  addCategory,
};