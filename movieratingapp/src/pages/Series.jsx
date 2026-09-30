import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import {
  getMovies,
} from "../services/movieService";


function Series() {

  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getMovies({
      movieType: "SERIES",
    })
      .then(setMovies)
      .finally(() =>
        setLoading(false)
      );

  }, []);


  return (
    <div className="app">

      <Navbar />

      <main className="content-container page-container">

        <div className="page-header">

          <span>
            SERIES COLLECTION
          </span>

          <h1>
            Series
          </h1>

        </div>


        {loading ? (

          <div className="loading">
            Loading series...
          </div>

        ) : (

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

      </main>

    </div>
  );
}

export default Series;