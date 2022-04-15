const { Pool, Client } = require('pg');

const dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

const pool = new Pool(dbParams)
pool.connect(() => {
  console.log("Connected to Database")
});

module.exports = pool;
