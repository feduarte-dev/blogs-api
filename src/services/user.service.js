const { User } = require('../models');

const createUser = (displayName, email, password, image) => User
  .create({ displayName, email, password, image });

const getUsers = () => User.findAll({ attributes: { exclude: 'password' } });

const getUserById = (id) => User.findOne({ where: { id }, attributes: { exclude: 'password' } });

module.exports = {
  createUser,
  getUsers,
  getUserById,
};