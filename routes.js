const express = require('express');

const route = express.Router();

const productsController = require('./controllers/productsController');

route.get('/products/:id', productsController.getById);

route.get('/products', productsController.getAll);

// route.get('sales',)

module.exports = route;