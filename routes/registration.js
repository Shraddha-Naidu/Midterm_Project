const express = require("express");
const router = express.Router();

const db = require('../lib/db')

const { validateUser } = require('../lib/helperFunctions')(db);
const { createNewUser } = require('../lib/helperFunctions')(db);

const registrationRoutes = (db) => {
  router.post("/", (req, res) => {
    const regEmail = req.body.email;
    const regPassword = req.body.password
    validateUser(req.body.email)
    .then((data) => {
      console.log('returning data from query', data)
      if(typeof data === 'undefined'){
        createNewUser(req.body.name, req.body.email, req.body.password)
        .then((user) =>{
          req.session.userid = user.id
          res.redirect('/stories')
        })
        .catch(err => {
          console.log(err)
        })
      }
      else{
        console.log('user exists')
      }

    })
    .catch((err) => {
      console.log(err.message)
    })
  })
  return router;
};

module.exports = registrationRoutes;
