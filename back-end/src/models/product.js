const connection = require('./connection');

const createProduct = async ({ name, price, stock, image, userId }) => {
  const db = await connection();
  const { _id } = db.collection('products').insertOne({ name, price, stock, image, userId });

  return { productId: _id }
};

module.exports = {
  createProduct,
};
