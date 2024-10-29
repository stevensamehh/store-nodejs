const pool = require('../config/database');

const Customer = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM store.customers');
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM store.customers WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (data) => {
    const { name, email, address, phone } = data;
    const result = await pool.query(
      'INSERT INTO store.customers (name, email, address, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, phone]
    );
    return result.rows[0];
  },

  update: async (id, data) => {
    const { name, email, address, phone } = data;
    const result = await pool.query(
      'UPDATE store.customers SET name = $1, email = $2, address = $3, phone = $4 WHERE id = $5 RETURNING *',
      [name, email, address, phone, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM store.customers WHERE id = $1', [id]);
    return result.rowCount;
  },
};

module.exports = Customer;
