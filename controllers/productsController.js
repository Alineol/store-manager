const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService
    .getAll();

  return res.status(products.s).json(products.m);
};

module.exports = {
  getAll,
};