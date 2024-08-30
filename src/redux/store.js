import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails);
  yield takeEvery('FETCH_GENRES', fetchGenres);
  yield takeEvery('ADD_MOVIE', addMovie);
  yield takeEvery('DELETE_MOVIE', deleteMovie);
  yield takeEvery('FETCH_ALL_GENRES', fetchAllGenres);
}

function* fetchAllMovies() {
  try {
    const moviesResponse = yield axios.get('/api/movies');
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data,
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchMovieDetails(action) {
  try {
    const response = yield axios.get(`/api/movies/${action.payload}`);
    yield put({ type: 'SET_DETAILS', payload: response.data[0] ?? {} });
    console.log(response.data[0]);
  } catch (error) {
    console.log('fetchMovieDetails error:', error);
  }
}

function* fetchAllGenres() {
  try {
    const genresResponse = yield axios.get('/api/genres');
    console.log('in fetchAllGenres saga, check genresResponse.data', genresResponse.data);
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data,
    });
  } catch (error) {
    console.log('fetchAllGenres error: ', error);
  }
}

function* fetchGenres(action) {
  try {
    const response = yield axios.get(`/api/genres/${action.payload}`);
    yield put({ type: 'SET_GENRES', payload: response.data ?? {} });
  } catch (error) {
    console.log('fetchGenres error', error);
  }
}

function* addMovie(action) {
  try {
    yield axios.post('/api/movies', action.payload);
    console.log('checking action.payload addMovie', action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('Error adding new movie', error);
  }
}

function* deleteMovie(action) {
  try {
    yield axios.delete(`/api/movies/${action.payload}`);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('Error deleting movie', error);
  }
}

const sagaMiddleware = createSagaMiddleware();

const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

const details = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload ?? {};
    default:
      return state;
  }
};

const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default storeInstance;
