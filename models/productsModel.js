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

module.exports = {
  getAll,
  getById,
  create,
};