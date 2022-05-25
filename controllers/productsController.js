const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService
    .getAll();
    const { s, message } = products;
  return res.status(s).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product[0]) {
    return res.status(200).json(product[0]);
  }
    return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getById,
  getAll,
};