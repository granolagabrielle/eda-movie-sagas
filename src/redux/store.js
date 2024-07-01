import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails);
  yield takeEvery('FETCH_GENRES', fetchGenres);
  yield takeEvery('ADD_MOVIE', addMovie);
  yield takeEvery('DELETE_MOVIE', deleteMovie);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data,
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

// Fetch movie details
function* fetchMovieDetails(action) {
  try {
    const response = yield axios.get(`/api/movies/${action.payload}`);
    yield put({ type: 'SET_DETAILS', payload: response.data[0] ?? {} });
    console.log(response.data[0]);
  } catch (error) {
    console.log('fetchMovieDetails error:', error);
  }
}

// Fetch movie genres
function* fetchGenres(action) {
  try {
    const response = yield axios.get(`/api/genres/${action.payload}`);
    yield put({ type: 'SET_GENRES', payload: response.data ?? {} });
  } catch (error) {
    console.log('fetchGenres error', error);
  }
}

// Add new movie
function* addMovie(action) {
  try {
    yield axios.post('/api/movies', action.payload);
    console.log('checking action.payload addMovie', action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('Error adding new movie', error);
  }
}

// Delete movie
function* deleteMovie(action) {
  try {
    yield axios.delete(`/api/movies/${action.payload}`);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('Error deleting movie', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie details
const details = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload ?? {};
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
