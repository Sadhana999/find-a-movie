
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import Pagination from './components/Pagination';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);


  const getMovieRequest = async (searchValue, pageNumber) => {
    const url = `//www.omdbapi.com/?s=${searchValue}&apikey=e921b492&page=${pageNumber}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    const count = responseJson.totalResults;

    if (responseJson.Search) {
      setMovies(movies.concat(responseJson.Search));
      setTotalMovies(count);
    }

  };

  useEffect(() => {
    if (searchValue == false) {
      setMovies([]);
      setTotalMovies(0);
    }
    else if (searchValue.trim()) {
      getMovieRequest(searchValue, currentPage);
    }
  }, [searchValue, currentPage]);

  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem('fav'));
    if (favMovies) {
      setFavourites(favMovies);
    }
  }, []);

  const saveToLocal = (item) => {
    localStorage.setItem('fav', JSON.stringify(item));
  };

  const addFav = (movie) => {
    const newFav = [...favourites, movie];
    setFavourites(newFav);
    saveToLocal(newFav);
  };

  const remFav = (movie) => {
    //  const newFav = favourites.filter(
    //     (fav) => fav.imdbId !== movie.imdbId
    //    );

    //  setFavourites(newFav);
    //  saveToLocal(newFav);

    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocal(newFavouriteList);

  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex  align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='movies'>
        <MovieList movies={currentMovies}
          favouriteComponent={AddFavourites}
          handleFavouritesClick={addFav}
        />

      </div>

      <div className='row d-flex  align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>

      <div className='movies'>
        <MovieList movies={favourites}
          favouriteComponent={RemoveFavourites}
          handleFavouritesClick={remFav}
        />
      </div>

      <Pagination moviesPerPage={moviesPerPage} totalMovies={totalMovies} paginate={paginate} />

    </div>
  );
};

export default App;
