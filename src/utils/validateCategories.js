const { getCategories } = require('../services/category.service');

const validateCategories = async (categoryIds) => {
  const { data } = await getCategories();
  const isValidCategory = categoryIds.every((categoryId) => data
    .some((category) => category.id === categoryId));

  return isValidCategory;
};

module.exports = validateCategories;