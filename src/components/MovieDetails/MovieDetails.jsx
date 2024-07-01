import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/';
import { useHistory } from 'react-router-dom/';
import './MovieDetails.css';

export default function MovieDetails() {
  // grab reducers from store
  const details = useSelector((store) => store.details);
  const genres = useSelector((store) => store.genres);
  const movies = useSelector((store) => store.movies);
  // console.log('Check genre details:', genres);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
// fetch details and genres on page load
  useEffect(() => {
    console.log(`GET ${params.id}`);
    dispatch({ type: 'FETCH_DETAILS', payload: params.id });
    dispatch({ type: 'FETCH_GENRES', payload: params.id });
  }, []);
// back to home button
  const returnHome = () => {
    history.push('/');
  };
// delete movie button
  const deleteMovie = () => {
    console.log('delete clicked, check movieId', params.id);
    dispatch({ type: 'DELETE_MOVIE', payload: params.id });
    history.push('/');
  };

  return (
    <div data-testid='movieDetails'>
      <div className='grid-container'>
        <div className='img-container'>
          <img src={details.poster} style={{ width: '15rem', height: '20rem' }} />
        </div>
        <div className='movie-details'>
          <h4 className='movie-title'>{details.title}</h4>
          <p>{details.description}</p>
          <h5>Movie Genres</h5>
          {genres.map((genre) => {
            return <p>{genre.name}</p>;
          })}
        </div>
      </div>
      <footer className='footer'>
        <button onClick={() => deleteMovie(movies.id)}>Delete Movie</button>
        <button data-testid='toList' onClick={returnHome}>
          Back to Movie List
        </button>
      </footer>
    </div>
  );
}