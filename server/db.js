const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "GZG7zn9b",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

module.exports = pool;
