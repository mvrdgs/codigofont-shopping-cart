const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async ({ name, price, stock, image, userId }) => {
  const db = await connection();
  const { _id } = db.collection('products').insertOne({ name, price, stock, image, userId });

  return { productId: _id }
};

const getAllProducts = async () => {
  const db = await connection();
  const result = await db.collection('products').find({}).toArray();

  return result;
};

const getProductsById = async (productsList) => {
  const list = productsList.map((productId) => ObjectId(productId));

  const db = await connection();
  const result = await db.collection('products').find({
    _id: { $in: list }
  }).toArray();

  return result;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
};
