const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');
const { getPostById } = require('./post.read.service');
const validateCategories = require('../utils/validateCategories');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const addPost = async (title, content, categoryIds, userId) => {
  const isValidCategory = await validateCategories(categoryIds);
  if (!isValidCategory) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  }
  
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({
      title, content, userId, published: new Date(), updated: new Date(),
    }, { transaction: t });

    const postId = newPost.dataValues.id;
    const addPostCategory = categoryIds.map(async (categoryId) => {
      await PostCategory.create({
        postId, categoryId,
      }, { transaction: t });
    });
    await Promise.all(addPostCategory);
    return newPost;
  });
  return { status: 201, data: result };
};

const updatePost = async (id, title, content, userId) => {
  const { data } = await getPostById(id);
  if (userId !== data.user.id) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  await BlogPost.update({ title, content }, { where: { id } });
  const newPost = await getPostById(id);
  return { status: 200, data: newPost.data };
};

const deletePost = async (id, userId) => {
  const { data } = await getPostById(id);
  if (data.message) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }
  if (userId !== data.user.id) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  
  await BlogPost.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = {
  addPost, 
  updatePost,
  deletePost, 
};
