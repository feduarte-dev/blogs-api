const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};