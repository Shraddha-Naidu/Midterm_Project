const express = require("express");
const router = express.Router();

const db = require('../lib/db')

const { validateUser } = require('../lib/validation')(db);
const { createNewUser } = require('../lib/helperFunctions')(db);

const registrationRoutes = (db) => {
  //Registratin Route
  router.post("/register", (req, res) => {
    const newUser = {
      regEmail: req.body.email,
      regPassword: req.body.password,
      regName: req.body.name
    }
    checkEmail(req.body.email)
      .then((data) => {
        if (!data) {
          res.status(400).html('Please use valid email and/or password.');
        } else if (data.email === newUser.email) {
          res.status(400).html('Existing user. Please try another email.');
        } else {
          console.log('New User:', newUser)
          createNewUser(newUser);
          res.html(`Welcome ${req.body.name}!`);
        }
        req.session.userid = newUser;
        res.redirect("/home")
      })
      .catch((err) => {
        res.send(500)
      })
  })
  return router;
};

module.exports = registrationRoutes;
