const productModel = require('../models/product');

const createProduct = async ({ name, price, stock, image, userId }) => {
  const { productId } = await productModel.createProduct({ name, price, stock, image, userId });

  const result = { productId, name, price, stock, image };

  return { result, status: 201 };
};

const getAllProducts = async () => {
  const data = await productModel.getAllProducts();

  const result = data.map(({ _id, name, price, stock, image }) => ({ productId: _id, name, price, stock, image }));

  return { result, status: 200 };
};

const getProductsById = async (productsList) => {
  const data = await productModel.getProductsById(productsList);

  const result = data.map(({ _id, name, price, stock, image }) => ({ productId: _id, name, price, stock, image }));

  return { result, status: 200 };
};

const createSale = async ({ userId, productsList }) => {
  const data = await productModel.createSale({ userId, productsList });

  return { result: data, status: 200 };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  createSale,
};
