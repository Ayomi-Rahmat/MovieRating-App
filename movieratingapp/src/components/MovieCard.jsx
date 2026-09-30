import {
  Star,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import movieImages from "../assets/movieImages";


function MovieCard({ movie }) {

  const navigate =
    useNavigate();

  const poster = movieImages[movie.title];


  return (
    <article
      className="movie-card"
      onClick={() =>
        navigate(`/movie/${movie.id}`)
      }
    >

      <div className="movie-poster">

        {poster ? (
          <img src={poster} 
               alt = {`${movie.title} poster`}
               className="movie-poster-image" 
          />
        ) : (

          <div className="poster-placeholder">
            {movie.title
              ?.charAt(0)
              ?.toUpperCase()
            }
          </div>

        )}

        

        <div className="movie-rating">

          <Star
            size={14}
            fill="currentColor"
          />

          {movie.averageRating?.toFixed(1)}

        </div>

      </div>


      <div className="movie-card-info">

        <h3>
          {movie.title}
        </h3>

        <p>
          {movie.genre}
        </p>

        <span>
          {movie.releaseYear}
        </span>

      </div>

    </article>
  );
}

export default MovieCard;