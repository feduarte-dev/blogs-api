const { userService } = require('../services');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, data } = await userService.login(email, password);

    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};