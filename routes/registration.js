const express = require("express");
const router = express.Router();

const { validateUser } = require('./lib/validation')(db);
const { createNewUser } = require('./lib/helperFunctions')(db);

const registrationRoutes = (db) => {
  router.post("/registration", (req, res) => {
    const regEmail = req.body.email;
    const regPassword = req.body.password
    validateUser(req.body.email)
    .then((data) => {
      if (!regEmail || !regPassword) {
        res.status(400).send('Please use valid email and/or password.');
      } else if (data.password === regPassword) {
        res.status(400).send('Existing user. Please try another email.');
      } else {
        console.log('New User:', req.body)
        const newUser = createNewUser(data.name, data.email, data.password);
      }
      req.session.userid = newUser;
      res.redirect("/myStories")
    })
    .catch((err) => {
      res.send(500)

  })
})
  return router;
};

module.exports = registrationRoutes;
