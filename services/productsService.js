const productsModel = require('../models/productsModel');
const { checkLenght } = require('../helpers.js/index');

const getAll = async () => {
  const [productsData] = await productsModel.getAll();
 return checkLenght(productsData, 'produtos');
};

module.exports = {
  getAll,
};