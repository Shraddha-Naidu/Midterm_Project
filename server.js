// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
// sessions middleware
app.use(session(
  {
    secret: 'keyboard tester',
    cookie: { maxAge: 604800000 },
    resave: false,
    saveUninitialized: true
  }
)) // Rememeber 'me' for 30 days

// PG database client/connection setup -- moved to db.js

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const storiesRoutes = require('./routes/stories');
const registrationRoutes = require('./routes/registration');
const db = require('./lib/db')
const { validateUser } = require('./lib/validation')(db);
const { getRandomStory } = require('./lib/helperFunctions')(db);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/stories', storiesRoutes(db))
app.use('/registration', registrationRoutes(db))
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  getRandomStory().then((data) => {
    const storyTitle = data[0].title;
    const storyContent = data[0].content;
    const templateVars = { storyTitle, storyContent, user: ''}
    res.render("home", templateVars);
  })
});

//login route
app.post('/', (req, res) => {
  validateUser(req.body.email)
    .then((value) => {
      console.log('value', value)
      if(value.password === req.body.password) {
        req.session.userid = value.id
        req.session.name = value.name
        console.log('login successful', req.session.userid, req.session.name)
        res.redirect('/stories')
      } else {
        res.send(401)
      }
    })
    .catch((err) => {
      res.send('invalid us/pw')
    })
})

app.post('/logout', (req, res) => {
  req.session.userid = null;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
