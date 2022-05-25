const connection = require('./connection');

const getAll = () => connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  const getById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  
    const [product] = await connection.execute(query, [id]);
  
    if (product.length === 0) return null;
  
    const { name, quantity } = product[0];
  
    return {
      id,
      name, 
      quantity,
    };
  };

module.exports = {
  getAll,
  getById,
};