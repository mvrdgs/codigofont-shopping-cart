const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.DB_URL;
const DB_NAME = 'codigo_fonte';

let schema = null;

const connection = () => {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((error) => console.error(error));
};

module.exports = connection;
