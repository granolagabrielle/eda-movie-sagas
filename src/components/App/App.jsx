import { Route, HashRouter as Router, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovieForm/AddMovie';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <header>
          <h1>The Movies Saga</h1>
          <nav>
            <ul>
              <li>
                <Link to='/'>All Movies</Link>
              </li>
              <li>
                <Link to='/addmovie'>Add Movie</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Route path='/' exact>
          <MovieList />
        </Route>
        <Route path='/addmovie' exact>
          <AddMovie />
        </Route>
        <Route path='/details/:id'>
          <MovieDetails />
        </Route>
      </Router>
    </div>
  );
}

export default App;
