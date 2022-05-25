const connection = require('./connection');

const getAll = () => connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  const getById = (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    return connection.execute(query, [id]);
  };

module.exports = {
  getAll,
  getById,
};