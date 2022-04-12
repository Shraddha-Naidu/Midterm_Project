const res = require('express/lib/response')
const { reset } = require('nodemon')
const pool = require('./db')

//retrieve all stories
module.exports = (db) => {
  const getAllStories = () => {
    return pool
      .query(`SELECT * FROM stories;`)
      .then((stories) => {
        return stories.rows
      })
      .catch((err) => {
        console.log(err)
        res.send(500)
      })
  }

  const getMyStories = (owner_id) => {
    return pool
      .query(`SELECT * FROM stories WHERE owner_id = $1;`, [owner_id])
      .then((story) => {
        return story.rows
      })
      .catch((err) => {
        res.send(500)
      })
  }

  const getStoryById = (id) => {
    return pool
      .query(`SELECT * FROM stories WHERE id = $1;`, [id])
      .then((story) => {
        return story.rows[0]
      })
      .catch((err) => {
        res.send(500)
      })
  }

  const createNewStory = (user_id, title, content) => {
    return pool
      .query(`INSERT INTO stories (owner_id, title, content) VALUES ($1, $2, $3) RETURNING *;`, [user_id, title, content])
      .then((story) => {
        return story.rows[0]
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllContributions = (story_id) => {
    return pool
      .query(`SELECT contributions.id, content, COUNT(upvotes.*) FROM contributions LEFT JOIN upvotes ON upvotes.contribution_id = contributions.id WHERE story_id = $1 GROUP BY contributions.id;`, [story_id])
      .then((contributions) => {
        return contributions.rows
      })
      .catch((err) => {
        res.send(500)
      })
  }

  const createNewContribution = (user_id, story_id, content) => {
    return pool
      .query(`INSERT INTO contributions (user_id, story_id, content) VALUES ($1, $2, $3) RETURNING *;`, [user_id, story_id, content])
      .then((contribution) => {
        return contribution.rows[0]
      })
      .catch((err) => {
        res.send(500)
      })
  }

  const addUpvote = (contribution_id, user_id) => {
    return pool
          .query(`INSERT INTO upvotes (contribution_id, user_id) VALUES ($1, $2) RETURNING *;`, [contribution_id, user_id])
          .then((upvote) => {
            return upvote.rows[0]
          })
          .catch((err) => {
            res.send(500)
          })
}

  const getRandomStory = (options, limit) => {
    return pool
      .query(`SELECT * FROM stories ORDER BY RANDOM() LIMIT $1;`, [1])
      .then((stories) => {
        return stories.rows;
      })
      .catch(() => {
        res.send(500);
      });
  };
  return { getAllStories, getMyStories, getStoryById, createNewStory, getAllContributions, createNewContribution, getRandomStory, addUpvote }
}




