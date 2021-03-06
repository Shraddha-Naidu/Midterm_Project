const res = require('express/lib/response')
const { reset } = require('nodemon')
const pool = require('./db')

module.exports = (db) => {
//check if user exists
    const validateUser = (email) => {
      return pool
              .query(`SELECT * FROM users WHERE email = $1;`, [email])
              .then((pass) => {
                return pass.rows[0]
              })
              .catch((err) => {
                res.html('user/pw does not exist')
              })
    };
  return { validateUser }
}
