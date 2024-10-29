const { Pool } = require('pg');
const config = require('./environment');

const pool = new Pool({
  host: config.development.db.host,
  port: config.development.db.port,
  user: config.development.db.user,
  password: config.development.db.password,
  database: config.development.db.name,
});

module.exports = pool;
