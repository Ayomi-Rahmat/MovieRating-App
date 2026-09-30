import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";

import {
  getMovies,
} from "../services/movieService";


function Home() {

  const navigate =
    useNavigate();


  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadMovies =
      async () => {

        try {

          const data =
            await getMovies();

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

  }, []);


  const featuredMovie =
    movies[3];


  const popularMovies =
    [...movies]
      .filter(
        (movie) =>
          movie.movieType === "MOVIE"
      )
      .sort(
        (a, b) =>
          (b.averageRating || 0)
          -
          (a.averageRating || 0)
      )
      .slice(0, 5);


  const animation =
    movies
      .filter(
        (movie) =>
          movie.movieType === "ANIMATION"
      )
      .slice(0, 5);


  const series =
    movies
      .filter(
        (movie) =>
          movie.movieType === "SERIES"
      )
      .slice(0, 5);


  const action =
    movies
      .filter(
        (movie) =>
          movie.genre?.toLowerCase()
            === "action"
      )
      .slice(0, 5);


  return (
    <div className="app">

      <Navbar />


      <main>

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
          !error &&
          movies.length > 0 && (

          <>

            <FeaturedMovie
              movie={featuredMovie}
            />


            <div className="content-container">

              <MovieRow
                title="Popular Movies"
                movies={popularMovies}
                onSeeAll={() =>
                  navigate("/movies")
                }
              />


              <MovieRow
                title="Popular Series"
                movies={series}
                onSeeAll={() =>
                  navigate("/series")
                }
              />


              <MovieRow
                title="Action"
                movies={action}
                onSeeAll={() =>
                  navigate(
                    "/movies?genre=ACTION"
                  )
                }
              />


              <MovieRow
                title="Animation"
                movies={animation}
                onSeeAll={() =>
                  navigate("/animation")
                }
              />

            </div>

          </>

        )}


        {!loading &&
          !error &&
          movies.length === 0 && (

          <div className="empty-page">

            <h2>
              No movies yet
            </h2>

            <p>
              Add movies to your database
              to see them here.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default Home;