const { Pool, Client } = require('pg');

const dbParams = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  };

const pool = new Pool(dbParams)
pool.connect(() => {
  console.log("Connected to Database")
});

module.exports = pool;
