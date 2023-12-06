const { User } = require('../models');

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { status: 200, data: users };
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  if (!user) {
    return { status: 404, data: { message: 'User does not exist' } };
  }
  return { status: 200, data: user };
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: 200, data: user };
};

const createUser = async (displayName, email, password, image) => {
  await User.create({ displayName, email, password, image });
  return { status: 201 };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
};