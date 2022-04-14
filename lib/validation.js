const res = require('express/lib/response')
const { reset } = require('nodemon')
const pool = require('./db')

module.exports = (db) => {
  //check if user exists
  const validateUser = (email) => {
    return pool
      .query(`SELECT password, id FROM users WHERE email = $1;`, [email])
      .then((pass) => {
        return pass.rows[0]
      })
      .catch((err) => {
        res.html('user/pw does not exist')
      })
  };
  const existingUser = (id) => {
    return pool
      .query(`SELECT id, name FROM users`)
      .then((pass) => {
        return pass.rows[0]
      })
      .catch((err) => {
        res.html('user/pw does not exist')
      })
  }
  const checkEmail = (email) => {
    return pool
      .query(`SELECT email FROM users WHERE email =$1;`, [email])
      .then((email) => {
        console.log('email:', email)
        return email.rows[0]
      })
      .catch((error) => {
        res.html('Existing email, please try again.')
      })
  }
  return { validateUser, existingUser, checkEmail }
}
