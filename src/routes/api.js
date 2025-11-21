const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout); // you should add middleware to validate tokens
router.get('/auth/me', authController.me);

router.get('/products', productController.index);
router.get('/products/:id', productController.show);
router.post('/products', productController.store);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.destroy);

module.exports = router;
