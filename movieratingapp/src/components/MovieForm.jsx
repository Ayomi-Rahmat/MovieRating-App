import { useState } from "react";
import { X } from "lucide-react";

function MovieFormContent({ movie, onClose, onSubmit }) {

  const [form, setForm] = useState(() => ({
    title: movie?.title || "",
    description: movie?.description || "",
    genre: movie?.genre || "",
    releaseYear: movie?.releaseYear || "",
    averageRating: movie?.averageRating || 0,
    totalRating: movie?.totalRating || 0,
  }));


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      ...form,
      releaseYear: form.releaseYear
        ? Number(form.releaseYear)
        : null,
      averageRating: Number(form.averageRating),
      totalRating: Number(form.totalRating),
    });

  };


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">

      <div className="bg-[#171512] border border-[#3a3329] rounded-xl w-full max-w-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold">
            {movie ? "Edit Movie" : "Add Movie"}
          </h2>

          <button
            onClick={onClose}
            className="text-[#aaa195] hover:text-white"
          >
            <X />
          </button>

        </div>


        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>

            <label className="block text-sm text-[#aaa195] mb-1">
              Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md p-3 outline-none focus:border-[#d9a441]"
            />

          </div>


          {/* Description */}
          <div>

            <label className="block text-sm text-[#aaa195] mb-1">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md p-3 outline-none focus:border-[#d9a441]"
            />

          </div>


          {/* Genre */}
          <div>

            <label className="block text-sm text-[#aaa195] mb-1">
              Genre
            </label>

            <input
              name="genre"
              value={form.genre}
              onChange={handleChange}
              required
              placeholder="e.g. Action"
              className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md p-3 outline-none focus:border-[#d9a441]"
            />

          </div>


          {/* Release year */}
          <div>

            <label className="block text-sm text-[#aaa195] mb-1">
              Release Year
            </label>

            <input
              type="number"
              name="releaseYear"
              value={form.releaseYear}
              onChange={handleChange}
              min="1888"
              className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md p-3 outline-none focus:border-[#d9a441]"
            />

          </div>


          {/* Rating fields */}
          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block text-sm text-[#aaa195] mb-1">
                Average Rating
              </label>

              <input
                type="number"
                name="averageRating"
                value={form.averageRating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md p-3 outline-none focus:border-[#d9a441]"
              />

            </div>


            <div>

              <label className="block text-sm text-[#aaa195] mb-1">
                Total Ratings
              </label>

              <input
                type="number"
                name="totalRating"
                value={form.totalRating}
                onChange={handleChange}
                min="0"
                className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md p-3 outline-none focus:border-[#d9a441]"
              />

            </div>

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#d9a441] text-black font-semibold py-3 rounded-md hover:bg-[#e5b85d] transition mt-2"
          >
            {movie ? "Update Movie" : "Create Movie"}
          </button>

        </form>

      </div>

    </div>
  );
}

function MovieForm({ movie, onClose, onSubmit }) {
  return (
    <MovieFormContent
      key={movie ? movie.id || movie.title : "new"}
      movie={movie}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

export default MovieForm;