const connection = require('./connection');

const createProduct = async ({ name, price, stock, image, userId }) => {
  const db = await connection();
  const { _id } = db.collection('products').insertOne({ name, price, stock, image, userId });

  return { productId: _id }
};

const getAllProducts = async () => {
  const db = await connection();
  const result = await db.collection('products').find({}).toArray();

  return result;
}

module.exports = {
  createProduct,
  getAllProducts,
};
