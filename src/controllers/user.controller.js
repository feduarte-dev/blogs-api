const { userService } = require('../services');
const getUserFromToken = require('../utils/getUserFromToken');

const getUsers = async (_req, res) => {
  try {
    const { status, data } = await userService.getUsers();
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userService.getUserById(id);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { status, data } = await userService.createUser(displayName, email, password, image);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { userId } = await getUserFromToken(authorization);
    const { status } = await userService.deleteUser(userId);
    return res.status(status).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById, 
  createUser, 
  deleteUser, 
};