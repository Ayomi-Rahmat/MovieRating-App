import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import {
  getMovies,
} from "../services/movieService";


function TVShows() {

  const [shows, setShows] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getMovies({
      movieType: "TV_SHOW",
    })
      .then(setShows)
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
            TELEVISION
          </span>

          <h1>
            TV Shows
          </h1>

        </div>


        {loading ? (

          <div className="loading">
            Loading TV shows...
          </div>

        ) : (

          <div className="movie-grid">

            {shows.map(
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

export default TVShows;