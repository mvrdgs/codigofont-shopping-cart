const productModel = require('../models/product');

const createProduct = async ({ name, price, stock, image, userId }) => {
  const { productId } = await productModel.createProduct({ name, price, stock, image, userId });

  const result = { productId, name, price, stock, image };

  return { result, status: 201 };
};

module.exports = {
  createProduct,
};
