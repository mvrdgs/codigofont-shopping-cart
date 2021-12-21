const connection = require('./connection');

const registerUser = async (email, password) => {
  const db = await connection();
  const { _id } = await db.collection('users').insertOne({
    email,
    password,
  });

  return { _id, email };
};

const searchEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({email,});

  return result;
};

module.exports = {
  registerUser,
  searchEmail,
};
