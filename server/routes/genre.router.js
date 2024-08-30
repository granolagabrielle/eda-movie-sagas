const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// router to join movies and genres and fetch this info from database
router.get('/:id', (req, res) => {
  const queryText = `
  SELECT "genres"."name", "movies_genres"."id"
  FROM "genres" JOIN "movies_genres"
  ON "genres"."id"="movies_genres"."genre_id"
  WHERE "movies_genres"."movie_id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error GETing movie genres', error);
      res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "genres";
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log('in all genres router, check result.rows', result.rows);
    })
    .catch((error) => {
      console.log('error getting all genres', error);
      res.sendStatus(500);
    });
});

module.exports = router;
