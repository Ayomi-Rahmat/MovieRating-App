import {
  Star,
  Play,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import inceptionTrailer from "../assets/Inception Trailer.mp4";
import inceptionPoster from "../assets/images/Inception.jpg";


function FeaturedMovie({ movie }) {

  const navigate =
    useNavigate();


  return (
    <section className="featured-movie">

      {/* MOVIE VIDEO */}
      <video
        className="featured-video"
        autoPlay
        muted
        loop
        playsInline
        poster={inceptionPoster}
      >
        <source
          src={inceptionTrailer}
          type="video/mp4"
        />
      </video>


      {/* DARK GRADIENT OVER VIDEO */}
      <div className="featured-overlay"></div>


      {/* MOVIE INFORMATION */}
      <div className="featured-content">

        <p className="featured-label">
          FEATURED MOVIE
        </p>


        <h1>
          {movie?.title || "Inception"}
        </h1>


        <div className="featured-meta">

          <span>
            <Star
              size={16}
              fill="currentColor"
            />

            {movie?.averageRating?.toFixed(1) || "4.8"}
          </span>


          <span>
            {movie?.releaseYear || "2010"}
          </span>


          <span>
            {movie?.genre || "Action"}
          </span>

        </div>


        <p className="featured-description">

          {movie?.description ||
            "A skilled thief who steals secrets through dreams is given a chance to have his past erased by planting an idea in someone's mind."}

        </p>


        <button
          className="featured-button"
          onClick={() => {
            if (movie?.id) {
              navigate(`/movie/${movie.id}`);
            }
          }}
        >

          <Play
            size={18}
            fill="currentColor"
          />

          Watch Now

        </button>

      </div>

    </section>
  );
}


export default FeaturedMovie;