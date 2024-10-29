const pool = require('../config/database');

// Create Order model
const Order = {
  create: async (orderData, orderItems) => {
    const { order_date, total_amount, customer_id, salesman_id } = orderData;

    // Insert into orders table
    const orderQuery = `
      INSERT INTO store.orders (order_date, total_amount, customer_id, salesman_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const orderResult = await pool.query(orderQuery, [order_date, total_amount, customer_id, salesman_id]);
    const orderId = orderResult.rows[0].id;

    // Insert into order_items table
    const orderItemsQuery = `
      INSERT INTO store.order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    for (let item of orderItems) {
      await pool.query(orderItemsQuery, [orderId, item.product_id, item.quantity, item.price]);
    }

    return orderResult.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM store.orders;';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const orderQuery = 'SELECT * FROM store.orders WHERE id = $1;';
    const orderResult = await pool.query(orderQuery, [id]);

    const orderItemsQuery = 'SELECT * FROM store.order_items WHERE order_id = $1;';
    const orderItemsResult = await pool.query(orderItemsQuery, [id]);

    return {
      order: orderResult.rows[0],
      items: orderItemsResult.rows,
    };
  },

  update: async (id, orderData) => {
    const { order_date, total_amount, customer_id, salesman_id } = orderData;
    const query = `
      UPDATE store.orders
      SET order_date = $1, total_amount = $2, customer_id = $3, salesman_id = $4
      WHERE id = $5
      RETURNING *;
    `;
    const result = await pool.query(query, [order_date, total_amount, customer_id, salesman_id, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM store.orders WHERE id = $1;';
    await pool.query(query, [id]);
    return { message: 'Order deleted successfully' };
  },
};

module.exports = Order;
