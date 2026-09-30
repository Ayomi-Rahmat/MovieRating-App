import MovieCard from "./MovieCard";


function MovieRow({
  title,
  movies = [],
  onSeeAll,
}) {

  return (
    <section className="movie-section">

      <div className="section-heading">

        <h2>
          {title}
        </h2>

        {onSeeAll && (

          <button
            onClick={onSeeAll}
            className="see-all"
          >
            See All
          </button>

        )}

      </div>


      {movies.length === 0 ? (

        <p className="empty-text">
          No movies available.
        </p>

      ) : (

        <div className="movie-row">

          {movies.map((movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
            />

          ))}

        </div>

      )}

    </section>
  );
}

export default MovieRow;