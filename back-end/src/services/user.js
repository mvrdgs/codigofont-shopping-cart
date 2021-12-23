const userModel = require('../models/user');
const regex = require('../utils/regex');
const generateToken = require('../utils/generateToken');

const INVALID_DATA = { status: 400, error: 'Dados inválidos' };

const validateUserData = (email, password) => {
  if (!regex.email.test(email)) return false;
  if (!regex.password.test(password)) return false;

  return true;
};

const login = async ({ email, password }) => {
  if (!validateUserData(email, password)) {
    return INVALID_DATA;
  };

  const result = await userModel.login({ email, password });

  if (!result) {
    return INVALID_DATA;
  }

  const { userId, email: userEmail } = result;

  const token = generateToken({ userId, email: userEmail })

  return {
    result: { token },
    status: 200,
  };
};

const registerUser = async ({ email, password, confirmPassword }) => {
  if (
    !validateUserData(email, password)
    || confirmPassword !== password
    ) {
    return { status: 400, error: 'Dados inválidos' };
  }
  
  const isRegistered = await userModel.searchEmail(email);
  if (isRegistered) {
    return INVALID_DATA;
  }

  const { userId, email: registeredEmail } = await userModel.registerUser({ email, password });

  const token = generateToken({ userId, email: registeredEmail });

  return {
    result: { token },
    status: 201,
  };
};

module.exports = {
  registerUser,
  login,
};
