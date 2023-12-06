const { Category } = require('../models');

const getCategories = async () => {
  const categories = await Category.findAll();
  return { status: 200, data: categories };
};

const addCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return { status: 201, data: newCategory };
};

module.exports = {
  getCategories,
  addCategory,
};