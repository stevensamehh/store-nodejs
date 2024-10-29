const pool = require('../config/database');

// Create Salesman model
const Salesman = {
  create: async (salesmanData) => {
    const { name, email, phone, salary } = salesmanData;
    const query = `
      INSERT INTO store.salesmen (name, email, phone, salary)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, email, phone, salary]);
    return result.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM store.salesmen;';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM store.salesmen WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  update: async (id, salesmanData) => {
    const { name, email, phone, salary } = salesmanData;
    const query = `
      UPDATE store.salesmen
      SET name = $1, email = $2, phone = $3, salary = $4
      WHERE id = $5
      RETURNING *;
    `;
    const result = await pool.query(query, [name, email, phone, salary, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM store.salesmen WHERE id = $1;';
    await pool.query(query, [id]);
    return { message: 'Salesman deleted successfully' };
  },
};

module.exports = Salesman;
