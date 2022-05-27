const connection = require('./connection');

const getAll = () => connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  const getById = (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    return connection.execute(query, [id]);
  };

  const create = async (name, quantity) => {
    const query = `INSERT INTO products(name, quantity) VALUES('${name}', ${quantity})`;
    const [result] = await connection.execute(query);
    
    return result.insertId;
  };

  const edit = async (id, name, quantity) => {
    const query = `UPDATE products SET name = '${name}', quantity = ${quantity} WHERE id = ${id};`;
    const [result] = await connection.execute(query);
    return result;
  };

  const deleteProduct = async (id) => {
    const query = `DELETE FROM products  WHERE id = ${id};`;
    return connection.execute(query);
  };

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteProduct,
};