const express = require('express');
const customerController = require('../controllers/customerController');
const salesmanController = require('../controllers/salesmanController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Customer routes
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

// Salesman routes
router.get('/salesmen', salesmanController.getAllSalesmen);
router.get('/salesmen/:id', salesmanController.getSalesmanById);
router.post('/salesmen', salesmanController.createSalesman);
router.put('/salesmen/:id', salesmanController.updateSalesman);
router.delete('/salesmen/:id', salesmanController.deleteSalesman);

// Product routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Order routes
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
