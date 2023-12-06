/* eslint-disable max-lines */
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
  return { status: 201, data: result };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 200, data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }
  return { status: 200, data: post };
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

const searchPosts = async (query) => {
  if (!query) {
    const { status, data } = await getPosts();
    return { status, data };
  }

  const posts = await BlogPost.findAll({ where: {
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

  return { status: 200, data: posts };
};

module.exports = { addPost, getPosts, getPostById, updatePost, deletePost, searchPosts };
