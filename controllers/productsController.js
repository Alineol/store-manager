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

const edit = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const response = await productsService.edit(name, quantity, id);
  if (response.message) {
    return res.status(response.code).json({ message: response.message });
  }
  return res.status(200).json(response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProduct(id);
  if (response.message) {
    return res.status(response.code).json({ message: response.message });
  }
  return res.status(204).json(null);
};

module.exports = {
  getById,
  getAll,
  create,
  edit,
  deleteProduct,
};