const express = require('express');

const route = express.Router();

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

route.get('/products/:id', productsController.getById);

route.get('/products', productsController.getAll);

route.get('/sales/:id', salesController.getById);

route.get('/sales', salesController.getAll);

// route.get('sales',)

module.exports = route;