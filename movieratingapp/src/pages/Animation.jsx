import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import {
  getMovies,
} from "../services/movieService";

// import inceptionCover from "../assets/Inception.jpg";
// import inceptionTrailer from "../assets/Inception Trailer.mp4"

function Animation() {

  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getMovies({
      movieType: "ANIMATION",
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
            ANIMATED
          </span>

          <h1>
            Animation
          </h1>

        </div>


        {loading ? (

          <div className="loading">
            Loading animation...
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

export default Animation;