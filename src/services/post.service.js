const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const { Op } = Sequelize;
const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const addPost = async (title, content, categoryIds, userId) => {
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
  return result;
};

const getPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostById = (id) => BlogPost.findOne({
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const updatePost = (id, title, content) => BlogPost.update({ title, content }, { where: { id } });

const deletePost = (id) => BlogPost.destroy({ where: { id } });

const searchPosts = (query) => BlogPost.findAll({ where: {
  [Op.or]: [
    { title: { [Op.like]: `%${query}%` } },
    { content: { [Op.like]: `%${query}%` } },
  ],
},
include: [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
],
});

module.exports = { addPost, getPosts, getPostById, updatePost, deletePost, searchPosts };
