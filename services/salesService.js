const salessModel = require('../models/salesModel');
const { checkLenght } = require('../helpers.js/index');

const getAll = async () => {
  const [salessData] = await salessModel.getAll();
 return checkLenght(salessData, 'vendas');
};

const getById = async (id) => {
  const [salesData] = await salessModel.getById(id);
  return salesData;
};

module.exports = {
  getAll,
  getById,
};