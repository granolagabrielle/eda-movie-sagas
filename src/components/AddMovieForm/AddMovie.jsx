import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './AddMovie.css';
import { useHistory } from 'react-router-dom';

export default function AddMovie() {
  const dispatch = useDispatch();
  const history = useHistory();

  // hold new movie in local state until submit button is clicked
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

  // send new movie to redux and then fetch all movies 
  const addMovie = () => {
    console.log('submit clicked');
    dispatch({ type: 'ADD_MOVIE', payload: newMovie });
    dispatch({ type: 'FETCH_MOVIES' });
    history.push('/');
  };

  // send user back to home page
  const cancel = () => {
    history.push('/');
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <div className='movie-form'>
        <form onSubmit={addMovie}>
          <input placeholder='Title' value={newMovie.title} onChange={handleNewMovie} />
          <textarea placeholder='Description' value={newMovie.description} onChange={handleNewMovie} />
          <input placeholder='Poster URL' value={newMovie.poster} onChange={handleNewMovie} />
          <select id='Genre' value={newMovie.genre_id} onChange={handleNewMovie}>
            <option defaultValue>Select Genre</option>
            <option value='1'>Adventure</option>
            <option value='2'>Animated</option>
            <option value='3'>Biographical</option>
            <option value='4'>Comedy</option>
            <option value='5'>Disaster</option>
            <option value='6'>Drama</option>
            <option value='7'>Epic</option>
            <option value='8'>Fantasy</option>
            <option value='9'>Musical</option>
            <option value='10'>Romantic</option>
            <option value='11'>Science Fiction</option>
            <option value='12'>Space-Opera</option>
            <option value='13'>Superhero</option>
          </select>
          <button type='submit'>Save</button>
          <button onClick={cancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
