const salessModel = require('../models/salesModel');
const { checkLength, checkId, checkQuant, 
  increaseProductQuantity } = require('../helpers.js/index');
const productsService = require('./productsService');
const producstModel = require('../models/productsModel');

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
  const [checkQuantity] = await Promise.all(
    await checkQuant(sales, productsService.getById, producstModel.editQuantity),
);
  if (checkQuantity.message) { return checkQuantity; }
  const id = await salessModel.create(sales);
  return {
    id,
    itemsSold: sales,
  };
};

const edit = async (itemUpdated, saleId) => {
  await salessModel.edit(itemUpdated, saleId);
  return {
    saleId,
    itemUpdated,
  };
};

const deleteSale = async (id) => {
  const sales = await getById(id);
  if (sales.message) {
    return sales;
  }
  await increaseProductQuantity(sales, productsService.getById, producstModel.editQuantity);
  return salessModel.deleteSale(id);
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteSale,
};