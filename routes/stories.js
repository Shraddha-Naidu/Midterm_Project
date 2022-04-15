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

    //my stories page
    router.get('/', (req, res) => {
      // console.log(req.session.name)
      storiesQueries.getMyStories(req.session.userid)
        .then((stories) => {
          const templateVars = {
            stories,
            userid: req.session.userid,
            user: req.session.name
          }
          res.render('owner_stories', templateVars);
        })
        .catch((err) => {
          res.render()
            .send(500);
        })
    });

    //reload my stories
    router.get('/owner', (req, res) => {
      storiesQueries.getMyStories(req.session.userid)
        .then((stories) => {
         res.json(stories)
        })
        .catch((err) => {
          res.render()
            .send(500);
        })
    });

    //get all stories
    router.get('/all', (req, res) => {
      storiesQueries.getAllStories()
        .then((stories) => {
          const templateVars = {stories, user: req.session.name}
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
        .then((values) => {
          const templateVars = {
            story: values,
            user_id: req.session.userid,
            user: req.session.name
          }
          if(req.session.userid === values.owner_id) {
            res.render('owner_story', templateVars)
          } else {
          res.render('story', templateVars)
          }
        })
        .catch((err) => {
          res.sendStatus(500);
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

    //get a contributions text by story id
    router.get('/:id/contributions/text', (req, res) => {
      storiesQueries.getContributionText(req.query.cont_id)
        .then((text) => {
          res.send(text);
        })
        .catch((err) => {
          res.send(500);
        })
    });

    //record upvotes on contribution
    router.post('/:id/contributions', (req, res) => {
      storiesQueries.addUpvote(req.body.cont_id, req.body.user_id)
        .then((stories) => {
          res.json(stories);
        })
        .catch((err) => {
          res.send(500);
        })
    });

    //delete contributions
    router.delete('/:id/contributions', (req, res) => {
      storiesQueries.deleteContributions(req.params.id)
        .then((deleted) => {
          res.json(deleted);
        })
        .catch((err) => {
          res.send(500);
        })
    });

    //patch to add contribution to story
    router.patch('/:id/contributions', (req, res) => {
      storiesQueries.selectContribution(req.body.storyId, req.body.content)
        .then((stories) => {
          res.json(stories);
        })
        .catch((err) => {
          res.send(500);
        })
    });

    //route to create a new story
    router.post('/', (req, res) => {
      storiesQueries.createNewStory(req.session.userid, req.body["new-story-title"], req.body['new-story-text'])
      .then((story) => {
        res.send(story)
      })
      .catch((err) => {
        console.log(err.message)
      })
  });

  //complete a story
  router.patch('/:id/', (req, res) => {
    storiesQueries.completeStory(req.params.id)
      .then((value) => {
        res.send(value)
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
