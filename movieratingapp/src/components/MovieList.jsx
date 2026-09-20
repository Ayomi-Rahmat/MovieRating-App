import MovieCard from "./MovieCard";

function MovieList({ movies, onEdit, onDelete }) {

  if (movies.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-100">

        <div className="text-center">

          <p className="text-[#aaa195] text-lg">
            No movies match these filters.
          </p>

          <p className="text-[#70695f] text-sm mt-2">
            Try changing your search or filters.
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="flex-1">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </div>

    </div>
  );
}

export default MovieList;