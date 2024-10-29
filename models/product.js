const pool = require('../config/database');

// Create Product model
const Product = {
  create: async (productData) => {
    const { name, price, description, stock } = productData;
    const query = `
      INSERT INTO store.product (name, price, description, stock)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, price, description, stock]);
    return result.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM store.product;';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM store.product WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  update: async (id, productData) => {
    const { name, price, description, stock } = productData;
    const query = `
      UPDATE store.product
      SET name = $1, price = $2, description = $3, stock = $4
      WHERE id = $5
      RETURNING *;
    `;
    const result = await pool.query(query, [name, price, description, stock, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM store.product WHERE id = $1;';
    await pool.query(query, [id]);
    return { message: 'Product deleted successfully' };
  },
};

module.exports = Product;
