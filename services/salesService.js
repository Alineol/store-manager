const salessModel = require('../models/salesModel');
const { checkLenght, checkId } = require('../helpers.js/index');

const getAll = async () => {
  const [salessData] = await salessModel.getAll();
  const result = checkLenght(salessData, 'vendas');
 return result;
};

const getById = async (id) => {
  const [salesData] = await salessModel.getById(id);
  const result = checkId(salesData, 'Sale');
  return result;
};

module.exports = {
  getAll,
  getById,
};