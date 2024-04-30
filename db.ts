const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "postgres",
  port: 8000,
});

module.exports = pool;
