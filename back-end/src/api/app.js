const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/user');
const productsController = require('../controllers/products');
const errorMiddleware = require('../middlewares/error');
const authenticateMiddleware = require('../middlewares/authenticate');

const app = express();

app.options(cors());
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', '/uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname.trim()}`);
  },
});
const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));
app.post('/image-upload', upload.single('image'), authenticateMiddleware, productsController.uploadImage);
app.post('/create-product', authenticateMiddleware, productsController.createProduct);
app.get('/products', productsController.getAllProducts);
app.post('/products-list', authenticateMiddleware, productsController.getProductsById);
app.post('/checkout', authenticateMiddleware, productsController.createSale);

app.post('/register', userController.registerUser);
app.post('/login', userController.login);

app.use(errorMiddleware);

module.exports = app;
