const { User } = require('../models');

const createUser = (displayName, email, password, image) => User
  .create({ displayName, email, password, image });

const getUsers = () => User.findAll({ attributes: { exclude: 'password' } });

const getUserById = (id) => User.findOne({ where: { id }, attributes: { exclude: 'password' } });

const deleteUser = (id) => User.destroy({ where: { id } });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};