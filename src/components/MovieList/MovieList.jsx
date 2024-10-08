import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/';
import './MovieList.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const viewDetails = (movieId) => {
    history.push(`/details/${movieId}`);
  };

  return (
    <main>
      <h2 className='header'>My Movie Inventory</h2>
      <section className='movie-container'>
        {movies.map((movie) => {
          return (
            <Card
              variant='outlined'
              sx={{ minWidth: 275 }}
              style={{ backgroundColor: 'darkslategrey' }}
              data-testid='movieItem'
              onClick={() => viewDetails(movie.id)}
              key={movie.id}
              className='movie-item'
            >
              <CardContent className='card-content'>
                <img
                  data-testid='toDetails'
                  style={{ width: '15rem', height: '20rem' }}
                  src={movie.poster}
                  alt={movie.title}
                />
                <Typography sx={{ fontSize: 14 }} color='white' gutterBottom>
                  <h3>{movie.title}</h3>
                  <Button style={{ color: 'black', backgroundColor: 'blanchedalmond' }} size='small'>
                    Learn More
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </section>
      <footer>© 2024</footer>
    </main>
  );
}

export default MovieList;
