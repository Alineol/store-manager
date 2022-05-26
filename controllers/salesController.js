const salessService = require('../services/salesService');
// const { checkLength } = require('../middlewares/index');

const getAll = async (_req, res) => {
  const sales = await salessService
    .getAll();
  if (sales.message) { return res.status(sales.code).json({ message: sales.message }); }
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salessService.getById(id);
  if (sale.message) { return res.status(sale.code).json({ message: sale.message }); }
  return res.status(200).json(sale);
};

module.exports = {
  getById,
  getAll,
};