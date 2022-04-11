const express = require("express");
const router = express.Router();

const registrationRoutes = (db) => {
  router.get("/", (req, res) => {
    console.log("registration route");
    res.render("registration")
  })

  return router;
};

module.exports = registrationRoutes;
