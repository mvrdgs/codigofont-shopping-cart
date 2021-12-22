const userService = require('../services/user');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { status, result, error } = await userService.login({ email, password });

    if (error) return next({ status, message: error });

    return res.status(status || 200).json(result);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const { status, result, error } = await userService.registerUser({ email, password, confirmPassword });

    if (error) next({ status, message: error });

    return res.status(status || 200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  login,
};
