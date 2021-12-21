const userModel = require('../models/user');
const regex = require('../utils/regex');

const validateUserData = (email, password, confirmPassword) => {
  if (!regex.email.test(email)) return false;
  if (!regex.password.test(password)) return false;
  if (confirmPassword !== password) return false;

  return true;
};

const registerUser = async ({ email, password, confirmPassword }) => {
  if (!validateUserData(email, password, confirmPassword)) {
    return { status: 400, message: 'Dados inválidos' };
  }
  
  const isRegistered = await userModel.searchEmail(email);
  if (isRegistered) return { status: 409, message: 'Email já cadastrado' };

  const { _id, email: registeredEmail } = await userModel.registerUser(email, password);

  return {
    result: { id: _id, email: registeredEmail },
    status: 201,
  };
};

module.exports = {
  registerUser,
};
