//routes for stories
const express = require('express');
const router = express.Router();
const db = require('../lib/db')
const storiesQueries = require('../lib/helperFunctions')(db);

  //
  const storiesRoutes = (db) => {

    //custom middleware
    router.use((req,res, next) => {
      if(!req.session.userid) {
        res.redirect('/');
      } else {
        next();
      }

    })

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
      console.log('userid is ', req.session.userid)
      storiesQueries.getStoryById(req.params.id)
        .then((values) => {
          const templateVars = {
            story: values,
            user_id: req.session.userid
          }
          res.render('story', templateVars)
        })
        .catch((err) => {
          res.send(500);
        })
    });

    //get a contributions by story id
    router.get('/:id/contributions', (req, res) => {
      storiesQueries.getAllContributions(req.params.id)
        .then((stories) => {
          res.json(stories);
        })
        .catch((err) => {
          res.send(500);
        })
    });

    router.post('/:id/contributions', (req, res) => {
      console.log(req.body)
      storiesQueries.addUpvote(req.body.cont_id, req.body.user_id)
        .then((stories) => {
          res.json(stories);
        })
        .catch((err) => {
          res.send(500);
        })
    });

    //route to create a new story
    router.post('/', (req, res) => {
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
    storiesQueries.createNewContribution(req.body.user_id, req.body.story_id, req.body.content)
      .then((contribution) => {
        res.send(contribution)
      })
      .catch((err) => {
        console.log(err.message)
      })

  });

  return router;
}

module.exports = storiesRoutes;
