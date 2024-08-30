import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './AddMovie.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AddMovie() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_GENRES' });
  }, []);

  const genres = useSelector((store) => store.genres);

  let [newMovie, setNewMovie] = useState({
    title: '',
    poster: '',
    description: '',
    genre_id: '',
  });

  const handleNewMovie = (event) => {
    if (event.target.placeholder === 'Title') {
      setNewMovie({ ...newMovie, title: event.target.value });
    } else if (event.target.placeholder === 'Description') {
      setNewMovie({ ...newMovie, description: event.target.value });
    } else if (event.target.placeholder === 'Poster URL') {
      setNewMovie({ ...newMovie, poster: event.target.value });
    } else if (event.target.id === 'Genre') {
      setNewMovie({ ...newMovie, genre_id: event.target.value });
    }
    return newMovie;
  };

  const addMovie = () => {
    dispatch({ type: 'ADD_MOVIE', payload: newMovie });
    dispatch({ type: 'FETCH_MOVIES' });
    history.push('/');
  };

  return (
    <div>
      <h2 className='header'>Add New Movie</h2>
      <div className='movie-form'>
        <form onSubmit={addMovie}>
          <div className='container'>
            <div className='row'>
              <label className='form-label'>Movie Title: </label>
              <input
                type='text'
                className='form-control'
                placeholder='Title'
                value={newMovie.title}
                onChange={handleNewMovie}
              />
            </div>
            <div className='row'>
              <label className='form-label'>Movie Description: </label>
              <textarea
                className='form-control'
                placeholder='Description'
                value={newMovie.description}
                onChange={handleNewMovie}
              />
            </div>
            <div className='row'>
              <label className='form-label'>Movie Poster URL: </label>
              <input
                className='form-control'
                placeholder='Poster URL'
                value={newMovie.poster}
                onChange={handleNewMovie}
              />
            </div>
            <div className='row'>
              <label className='form-label'>Select Genre: </label>
              <select id='Genre' className='form-select' value={newMovie.genre_id} onChange={handleNewMovie}>
                <option defaultValue>Select Genre</option>
                {genres.map((genre) => {
                  return <option key={genre.id}>{genre.name}</option>;
                })}
              </select>
            </div>
            <div className='row'>
              <button type='submit'>Save</button>
              <button onClick={() => history.push('/')}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
