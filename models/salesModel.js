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
const create = async (sales) => {
  const queryA = 'INSERT INTO sales (date) values(CURRENT_TIMESTAMP)';
  const [responseA] = await connection.execute(queryA);
  const id = responseA.insertId;
  const queryB = 'INSERT INTO sales_products (sale_id, product_id, quantity ) VALUES (?, ?, ?)';
  await sales.forEach((sale) => {
    const { productId, quantity } = sale;
     connection.execute(queryB, [id, productId, quantity]);
  });
  return id;
};

module.exports = {
  getAll,
  getById,
  create,
};