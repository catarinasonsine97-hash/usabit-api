const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
  console.log("✅ Conectado ao PostgreSQL");
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
