const salesService = require('../services/salesService');
// const { checkLength } = require('../middlewares/index');

const getAll = async (_req, res) => {
  const sales = await salesService
    .getAll();
  if (sales.message) { return res.status(sales.code).json({ message: sales.message }); }
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (sale.message) { return res.status(sale.code).json({ message: sale.message }); }
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const sales = req.body;
  const response = await salesService.create(sales);
  res.status(201).json(response);
};

const edit = async (req, res) => {
  console.log('controller');
  const sale = req.body;
  const { id } = req.params;
  const response = await salesService.edit(sale, id);
  res.status(200).json(response);
};

module.exports = {
  getById,
  getAll,
  create,
  edit,
};