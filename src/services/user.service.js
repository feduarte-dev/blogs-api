const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ data: { email, userId: user.dataValues.id } }, secret, jwtConfig);

  return { status: 200, data: { token } };
};

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

const createUser = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return { status: 409, data: { message: 'User already registered' } };
  }

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  await User.create({ displayName, email, password, image });
  
  return { status: 201, data: { token } };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return { status: 204 };
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  deleteUser,
};