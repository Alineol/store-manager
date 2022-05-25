const salessService = require('../services/salesService');
// const { checkLength } = require('../middlewares/index');

const getAll = async (_req, res) => {
  const sales = await salessService
    .getAll();
    const { s, message } = sales;
  return res.status(s).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salessService.getById(id);
  if (sale.length > 0) {
    return res.status(200).json(sale);
  }
    return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
  getById,
  getAll,
};