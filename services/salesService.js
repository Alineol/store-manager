const salessModel = require('../models/salesModel');
const { checkLength, checkId } = require('../helpers.js/index');

const getAll = async () => {
  const [salessData] = await salessModel.getAll();
  const result = checkLength(salessData, 'vendas');
 return result;
};

const getById = async (id) => {
  const [salesData] = await salessModel.getById(id);
  const result = checkId(salesData, 'Sale');
  return result;
};

const create = async (sales) => {
  const id = await salessModel.create(sales);
  return {
    id,
    itemsSold: sales,
  };
};

const edit = async (itemUpdated, saleId) => {
  console.log('service');
  await salessModel.edit(itemUpdated, saleId);
  return {
    saleId,
    itemUpdated,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
};