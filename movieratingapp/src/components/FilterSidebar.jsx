import { Search } from "lucide-react";

function FilterSidebar({
  search,
  setSearch,
  genre,
  setGenre,
  minRating,
  setMinRating,
}) {

  return (
    <aside className="w-full lg:w-80 border border-[#332d24] rounded-lg p-4 bg-[#171512]">

      Search
      <div className="relative mb-6">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8579]"
        />

        <input
          type="text"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md py-3 pl-10 pr-3 outline-none focus:border-[#d9a441] text-sm"
        />

      </div>


      {/* Genre */}
      <div className="mb-5">

        <label className="block text-sm text-[#aaa195] mb-2">
          Genre
        </label>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md px-3 py-2.5 outline-none focus:border-[#d9a441]"
        >
          <option>All</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Horror</option>
          <option>Romance</option>
          <option>Sci-Fi</option>
          <option>Thriller</option>
          <option>Animation</option>
        </select>

      </div>


      {/* Minimum rating */}
      <div>

        <label className="block text-sm text-[#aaa195] mb-2">
          Minimum rating
        </label>

        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="w-full bg-[#1d1a16] border border-[#3a3329] rounded-md px-3 py-2.5 outline-none focus:border-[#d9a441]"
        >
          <option>Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>

      </div>

    </aside>
  );
}

export default FilterSidebar;