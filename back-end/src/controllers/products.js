const productService = require('../services/product');

const uploadImage = (req, res, next) => {
  try {
    const { filename } = req.file;

    return res.status(200).json({ fileUrl: `/image/${filename}` });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, image } = req.body;
    const { userId } = req.auth;

    const { status, result, error } = await productService.createProduct({ name, price, stock, image, userId });

    if (error) next({ status, message: error });

    return res.status(status).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadImage,
  createProduct,
};
