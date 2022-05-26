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

const create = async (name, quantity) => {
  const products = await getAll();
  if (products.some((product) => product.name === name)) {
    return { code: 409, message: 'Product already exists' };
  }
  const id = await productsModel.create(name, quantity);
  
  return { id, name, quantity };
};

module.exports = {
  getAll,
  getById,
  create,
};