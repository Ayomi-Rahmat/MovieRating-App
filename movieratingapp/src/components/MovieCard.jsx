import { Star, Pencil, Trash2 } from "lucide-react";

function MovieCard({ movie, onEdit, onDelete }) {

  return (
    <div className="border border-[#332d24] bg-[#171512] rounded-lg p-5 hover:border-[#51452f] transition">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">

        <div>
          <h2 className="text-xl font-semibold text-[#f5f1e8]">
            {movie.title}
          </h2>

          <p className="text-sm text-[#9c958a] mt-1">
            {movie.genre}
            {movie.releaseYear && ` • ${movie.releaseYear}`}
          </p>
        </div>


        {/* Rating */}
        <div className="flex items-center gap-1 text-[#d9a441]">
          <Star size={16} fill="currentColor" />

          <span className="font-semibold">
            {movie.averageRating?.toFixed(1) ?? "0.0"}
          </span>
        </div>

      </div>


      {/* Description */}
      <p className="text-sm text-[#aaa195] mt-4 leading-6">
        {movie.description || "No description available."}
      </p>


      {/* Bottom */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#302a23]">

        <span className="text-xs text-[#80786c]">
          {movie.totalRating ?? 0} ratings
        </span>


        <div className="flex gap-2">

          <button
            onClick={() => onEdit(movie)}
            className="p-2 rounded-md border border-[#3a3329] hover:border-[#d9a441] hover:text-[#d9a441] transition"
          >
            <Pencil size={15} />
          </button>


          <button
            onClick={() => onDelete(movie.id)}
            className="p-2 rounded-md border border-[#3a3329] hover:border-red-500 hover:text-red-500 transition"
          >
            <Trash2 size={15} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default MovieCard;