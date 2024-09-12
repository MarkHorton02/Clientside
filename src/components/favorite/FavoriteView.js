import React, { useState, useEffect } from "react";
import tmdbApi from '../../api/tmdbApi';
import apiFavorites from '../../api/apiFavorites';
import "./favorite-view.css";

import PageHeader from '../page-header/PageHeader';




function FavoriteView() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userid");

    async function fetchData() {
      try {
        const response = await apiFavorites.get(`/api/favorites/${userId}`);
        setFavoriteMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);



  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    favoriteMovies.forEach((movie) => {
      tmdbApi.detail("movie", movie.movieId, { params: {} }).then((res) => {
        setMovieDetails((movieDetails) => [...movieDetails, res]);
      });
    });
  }, [favoriteMovies]);

  

  const removeFavorite = (movieId) => {
    const userId = localStorage.getItem("userid");
    async function fetchData() {
      try {
        const response = await apiFavorites.delete(
          `/api/favorites/${userId}/${movieId}`
        );
        console.log(response.data);
        
        setMovieDetails(movieDetails.filter((movie) => movie.id !== movieId));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  };

  

  
  return (
    <div className="container">
      <PageHeader>
        Your Favorites
      </PageHeader>
      <div className="favorite-view">
        <table className="favorite-table">
          <thead>
            <tr>
              <th className="favorite-header">Poster</th>
              <th className="favorite-header">Title</th>
              <th className="favorite-header">Voting Average</th>
              <th className="favorite-header">Release Year</th>
              <th className="favorite-header">Remove</th>
            </tr>
          </thead>
          <tbody>
            {movieDetails.map((movie) => (
              <tr key={movie.id}>
                <td>
                <a className="title-link" href={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="favorite-poster"
                  />
                  </a>
                </td>
                <td> <a className="title-link" href={`/movie/${movie.id}`}>{movie.title}</a></td>
                <td>{movie.vote_average}</td>
                <td>{movie.release_date}</td>
                <td>
                  <button
                    onClick={() => {
                      removeFavorite(movie.id);
                    }}
                    className="favorite-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoriteView;