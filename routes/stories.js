//routes for stories
const express = require('express');
const router = express.Router();
const storiesQueries = require('../lib/helperFunctions')

  //
  const storiesRoutes = (db) => {
    //get all stories
    router.get('/', (req, res) => {
      storiesQueries.getAllStories()
        .then((stories) => {
          const templateVars = {stories}
          res.render('stories', templateVars);
        })
        .catch((err) => {
          res.render()
            .send(500);
        })
    });
    //get a story by id
    router.get('/:id', (req, res) => {
      storiesQueries.getStoryById(req.params.id)
        .then((story) => {
          res.json(story);
        })
        .catch((err) => {
          res.send(500);
        })
    });
    //route to create a new story
    router.post('/', (req, res) => {
      storiesQueries.createNewStory(req.body.id, req.body.content)
      .then((story) => {
        res.send(story)
      })
    });
    return router;
  }

module.exports = storiesRoutes;
