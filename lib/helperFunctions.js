const res = require('express/lib/response')
const { reset } = require('nodemon')
const pool = require('./db')

//retrieve all stories
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
          .query(`SELECT * FROM stories WHERE owner_id = $1`, [owner_id])
          .then((story) => {
            return story.row
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

const createNewStory = (user_id, content) => {
  return pool
          .query(`INSERT INTO stories (owner_id, content) VALUES ($1, $2) RETURNING *`, [user_id, content])
          .then((story) => {
            return story.rows[0]
          })
          .catch((err) => {
            res.send(500)
          })
}

const getAllContributions = (story_id) => {
  return pool
          .query(`SELECT * FROM contributions WHERE story_id = $1`, [story_id])
          .then((stories) => {
            return stories.row
          })
          .catch((err) => {
            res.send(500)
          })
}





module.exports = { getAllStories, getMyStories, getStoryById, createNewStory, getAllContributions }
