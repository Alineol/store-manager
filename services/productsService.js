const productsModel = require('../models/productsModel');
const { checkLength, checkId } = require('../helpers.js/index');

const getAll = async () => {
  const [productsData] = await productsModel.getAll();
  const result = checkLength(productsData, 'produtos');
 return result;
};

const getById = async (id) => {
  const [productData] = await productsModel.getById(id);
  const result = checkId(productData, 'Product');
  return result;
};

module.exports = {
  getAll,
  getById,
};