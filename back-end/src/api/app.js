const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('../controllers/user');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/register', userController.registerUser);

app.use(errorMiddleware);

module.exports = app;
