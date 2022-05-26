const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService
    .getAll();
 if (products.message) { return res.status(products.code).json({ message: products.message }); }
 return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.create(name, quantity);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(201).json(product);
};

module.exports = {
  getById,
  getAll,
  create,
};