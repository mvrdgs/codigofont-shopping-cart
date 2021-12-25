const connection = require('./connection');

const login = async ({ email, password }) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email, password })

  if (!result) return null;

  const { _id: userId, email: userEmail } = result;
  return { userId, email: userEmail };
};

const registerUser = async ({ email, password }) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({
    email,
    password,
  });

  return { userId: insertedId, email };
};

const searchEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({email,});

  return result;
};

module.exports = {
  registerUser,
  searchEmail,
  login,
};
