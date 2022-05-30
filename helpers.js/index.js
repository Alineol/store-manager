const checkLength = (array, name) => {
if (array.length === 0) {
  return { code: 404, message: `Não existem ${name} cadastrado(as)` };
} 
return array;
};

const checkId = (result, name) => {
  if (result.length >= 1) {
    return result;
  }
  return { code: 404, message: `${name} not found` };
};

// const checkProductName = async (getAll, name) => {
//   const products = await getAll();
//   if (products.some((product) => product.name === name)) {
//     return { code: 409, message: 'Product already exists' };
//   }
// };
// const producstService = require('./productsService');

const checkQuant = async (sales, getById) => sales.map(async (sale) => {
   const id = sale.productId;
   const saleQuant = sale.quantity;
   const product = await getById(id);
   const { quantity } = product[0];
   if (saleQuant > quantity) {
     return { code: 422, message: 'Such amount is not permitted to sell' };
   }
  });

module.exports = {
   checkLength,
  checkId,
  checkQuant,
};