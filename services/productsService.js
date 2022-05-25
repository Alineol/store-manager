const productsModel = require('../models/productsModel');
const { checkLenght } = require('../helpers.js/index');

const getAll = async () => {
  const [productsData] = await productsModel.getAll();
 return checkLenght(productsData, 'produtos');
};

const getById = async (id) => {
  const [productData] = await productsModel.getById(id);
  return productData;
};

module.exports = {
  getAll,
  getById,
};