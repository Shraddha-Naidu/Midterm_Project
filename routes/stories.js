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
      const getStory = storiesQueries.getStoryById(req.params.id)
      const getContributions = storiesQueries.getAllContributions(req.params.id)
      Promise.all([getStory, getContributions])
        .then((values) => {
          console.log(values)
          const templateVars = {
            story: values[0],
            contributions: values[1]
          }
          res.render('story', templateVars);
        })
        .catch((err) => {
          res.send(500);
        })
    });
    //route to create a new story
    router.post('/', (req, res) => {
      console.log(req.body)
      storiesQueries.createNewStory(req.body.id, req.body.title, req.body.content)
      .then((story) => {
        res.send(story)
      })
      .catch((err) => {
        console.log(err.message)
      })
    });

    //create a new contribution
    router.post('/:id/', (req, res) => {
      console.log(req)
      storiesQueries.createNewContribution(req.body.user_id, req.body.story_id, req.body.content)
    })
    return router;
  }

module.exports = storiesRoutes;
