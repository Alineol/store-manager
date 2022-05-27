const express = require('express');
const { validadeProductsBody } = require('./middlewares/products');
// const { validadeSalesBody } = require('./middlewares/sales');

const route = express.Router();

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

route.get('/products/:id', productsController.getById);

route.get('/products', productsController.getAll);

route.post('/products', validadeProductsBody, productsController.create);

route.put('/products/:id', validadeProductsBody, productsController.edit);

route.get('/sales/:id', salesController.getById);

route.get('/sales', salesController.getAll);

// route.post('/sales', validadeSalesBody, salesController.create);

// route.get('sales',)

module.exports = route;