const connection = require('./connection');

const query1 = 'SELECT s.id as saleId, s.date, sp.quantity,';
const query2 = ' sp.product_id as productId FROM StoreManager.sales As s';
const query3 = ' INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id';
const query4 = ' WHERE s.id = ?';

const getAll = () => connection.execute(`${query1}${query2}${query3};`);

  const getById = (id) => {
    const query1b = 'SELECT s.date, sp.quantity,';
    const query = `${query1b}${query2}${query3}${query4};`;
    return connection.execute(query, [id]);
  };

module.exports = {
  getAll,
  getById,
};