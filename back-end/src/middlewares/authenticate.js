const jwt = require('jsonwebtoken');
require('dotenv').config

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const SECRET = process.env.SECRET;

    console.log('authorization', authorization);

    if (!authorization) next({ status: 401, message: 'Autorização não encontrada' });
  
    const data = jwt.verify(authorization, SECRET);
    
    req.auth = { ...data };

    next();
  } catch (error) {
    next({ status: 401, message: 'Autorização inválida' });
  }
};
