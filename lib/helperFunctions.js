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
      .query(`SELECT stories.*, users.name FROM stories JOIN users ON users.id = stories.owner_id WHERE stories.id = $1;`, [id])
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
      .query(`SELECT contributions.id, content, COUNT(upvotes.*) FROM contributions LEFT JOIN upvotes ON upvotes.contribution_id = contributions.id WHERE story_id = $1 GROUP BY contributions.id ORDER BY COUNT(upvotes.*) DESC;`, [story_id])
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

  const selectContribution = (story_id, content) => {
    return pool
      .query(`UPDATE stories SET content = CONCAT(content, $2::text) WHERE id = $1 RETURNING *;`, [story_id, content])
      .then(updatedStory => {
        return updatedStory.rows[0];
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getContributionText = (cont_id) => {
    return pool
      .query(`SELECT content FROM contributions WHERE id = $1;`, [cont_id])
      .then(content => {
        return content.rows[0];
      })
      .catch(err => {
        console.log(err)
      })
  }

  const completeStory = (story_id) => {
    return pool
      .query(`UPDATE stories SET IsComplete = 't' WHERE id = $1 RETURNING *;`, [story_id])
      .then((value) => {
        return value.rows[0]
      })
  }

  const deleteContributions = (story_id) => {
    return pool
      .query(`DELETE FROM contributions WHERE story_id = $1 RETURNING *;`, [story_id])
      .then(data => {
        return data.rows
      })
      .catch(err => {
        console.log(err)
      })
  }

  const createNewUser = (name, email, password) => {
    return pool
          .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [name, email, password])
          .then((newUser) => {
            return newUser.rows[0]
          })
          .catch((err) => {
            res.send(500)
          })
}
  const validateUseEmail = (email) => {
    return pool
      .query(`SELECT email FROM users WHERE email = $1;`, [email])
      .then(data => {
        return data.rows[0];
      })
      .catch(err => {
        console.log(err.message)
      })

  }

  // const retrieveUser = (userid) => {
  //   return pool
  //     .query(`SELECT * FROM users WHERE id = $1;`, [userid])
  //     .then(user => {
  //       return user.rows[0]
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })

  // }

  return { getAllStories, getMyStories, getStoryById, createNewStory, getAllContributions, createNewContribution, getRandomStory, addUpvote, selectContribution, getContributionText, completeStory, deleteContributions, createNewUser, validateUseEmail }
}




