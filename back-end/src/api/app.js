const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('../controllers/user');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.options(cors());
app.use(bodyParser.json());
app.use(cors());

app.post('/register', userController.registerUser);
app.post('/login', userController.login);

app.use(errorMiddleware);

module.exports = app;
