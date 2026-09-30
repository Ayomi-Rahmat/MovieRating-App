import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import {
  getMovies,
  searchMovies,
} from "../services/movieService";


function Movies() {

  const [
    searchParams
  ] = useSearchParams();


  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadMovies =
      async () => {

        setLoading(true);

        setError("");


        try {

          const search =
            searchParams.get(
              "search"
            );


          const genre =
            searchParams.get(
              "genre"
            );


          let data;


          if (search) {

            data =
              await searchMovies(
                search
              );

          } else {

            data =
              await getMovies({
                movieType: "MOVIE",
                genre: genre || undefined,
              });

          }


          setMovies(data);

        } catch (error) {

          setError(
            error.message
          );

        } finally {

          setLoading(false);
        }
      };


    loadMovies();

  }, [searchParams]);


  return (
    <div className="app">

      <Navbar />


      <main className="content-container page-container">

        <div className="page-header">

          <span>
            MOVIE COLLECTION
          </span>

          <h1>
            Movies
          </h1>

        </div>


        {loading && (
          <div className="loading">
            Loading movies...
          </div>
        )}


        {error && (
          <div className="error-page">
            {error}
          </div>
        )}


        {!loading &&
          !error && (

          <div className="movie-grid">

            {movies.map(
              (movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              )
            )}

          </div>

        )}


        {!loading &&
          !error &&
          movies.length === 0 && (

          <p className="empty-text">
            No movies found.
          </p>

        )}

      </main>

    </div>
  );
}

export default Movies;