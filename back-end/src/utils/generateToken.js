require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = ({ userId, email }) => {
  const SECRET = process.env.SECRET;

  const JwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ userId, email }, SECRET, JwtConfig);

  return token;
};
