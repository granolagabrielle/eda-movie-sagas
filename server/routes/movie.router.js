const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [req.body.title, req.body.poster, req.body.description];
  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, insertMovieValues)
    .then((result) => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [createdMovieId, req.body.genre_id];
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, insertMovieGenreValues)
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});

// GET request for individual movie (use req.params and :id)
router.get('/:id', (req, res) => {
  const queryText = `
  SELECT * FROM "movies" WHERE id=$1;
  `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in GET /api/movies/:id', err);
      res.sendStatus(500);
    });
});

// DELETE request for movie
router.delete('/:id', (req, res) => {
  const queryText = `
  DELETE FROM "movies_genres" WHERE "movie_id"=$1;`;
  pool.query(queryText, [req.params.id]).then(() => {
    const query = `
    DELETE FROM "movies" WHERE id=$1;`;
    pool
      .query(query, [req.params.id])
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Error deleting movie', err);
        res.sendStatus(500);
      });
  });
});

module.exports = router;
