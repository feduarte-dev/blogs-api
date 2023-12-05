const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const user = await loginService.getByEmail(email);
    const token = jwt.sign({ data: { email, userId: user.dataValues.id } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};