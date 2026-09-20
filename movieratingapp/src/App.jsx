import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import FilterSidebar from "./components/FilterSidebar";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "./services/movieService";

import {
  isLoggedIn,
  logout,
} from "./services/authService";


function App() {

  // =============================
  // AUTHENTICATION
  // =============================

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);


  // =============================
  // MOVIE STATES
  // =============================

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("All");

  const [minRating, setMinRating] = useState("Any");

  const [showForm, setShowForm] = useState(false);

  const [editingMovie, setEditingMovie] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =============================
  // LOAD MOVIES
  // =============================

  useEffect(() => {

    const load = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getMovies(
          genre === "All" ? "" : genre,
          minRating === "Any" ? "" : minRating
        );

        setMovies(data);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to connect to the movie server."
        );

      } finally {

        setLoading(false);

      }

    };

    load();

  }, [genre, minRating]);


  // =============================
  // SEARCH MOVIES
  // =============================

  const filteredMovies = movies.filter((movie) =>
    movie.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  // =============================
  // ADD MOVIE
  // =============================

  const handleAddMovie = () => {

    if (!loggedIn) {
      setShowLogin(true);
      return;
    }

    setEditingMovie(null);
    setShowForm(true);

  };


  // =============================
  // EDIT MOVIE
  // =============================

  const handleEditMovie = (movie) => {

    if (!loggedIn) {
      setShowLogin(true);
      return;
    }

    setEditingMovie(movie);
    setShowForm(true);

  };


  // =============================
  // SAVE MOVIE
  // =============================

  const handleSubmitMovie = async (movieData) => {

    try {

      setError("");

      if (editingMovie) {

        await updateMovie(
          editingMovie.id,
          movieData
        );

      } else {

        await createMovie(movieData);

      }

      setShowForm(false);
      setEditingMovie(null);

      // Reload movies
      const data = await getMovies(
        genre === "All" ? "" : genre,
        minRating === "Any" ? "" : minRating
      );

      setMovies(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Unable to save movie."
      );

    }

  };


  // =============================
  // DELETE MOVIE
  // =============================

  const handleDeleteMovie = async (id) => {

    if (!loggedIn) {
      setShowLogin(true);
      return;
    }

    try {

      setError("");

      await deleteMovie(id);

      const data = await getMovies(
        genre === "All" ? "" : genre,
        minRating === "Any" ? "" : minRating
      );

      setMovies(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Unable to delete movie."
      );

    }

  };


  // =============================
  // LOGIN
  // =============================

  const handleLogin = () => {

    setLoggedIn(true);
    setShowLogin(false);

  };


  // =============================
  // LOGOUT
  // =============================

  const handleLogout = () => {

    logout();

    setLoggedIn(false);

  };

  if (window.location.pathname === "/payment-success") {
    return <PaymentSuccess />;
  }

  // =============================
  // UI
  // =============================

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f5f1e8]">

      {/* Navbar */}
      <Navbar
        onAddMovie={handleAddMovie}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        onPayment={() => setShowPayment(true)}
        loggedIn={loggedIn}
      />


      {/* Main content */}
      <main className="flex">

        {/* Sidebar */}
        <FilterSidebar
          genre={genre}
          setGenre={setGenre}
          minRating={minRating}
          setMinRating={setMinRating}
        />


        {/* Movies */}
        <section className="flex-1 p-7">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

            <div>
              <h2 className="text-2xl font-semibold">
                Movie Catalogue
              </h2>

              <p className="text-gray-400 mt-1">
                Discover and manage your movies.
              </p>
            </div>


            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search movies..."
              className="w-full md:w-64 px-4 py-2 bg-[#1c1a17] border border-[#332d24] rounded-md text-white outline-none focus:border-[#d9a441]"
            />

          </div>


          {/* Error */}
          {error && (
            <div className="mb-5 p-4 border border-red-900 bg-red-950/30 text-red-400 rounded-md">
              {error}
            </div>
          )}


          {/* Loading */}
          {loading ? (

            <div className="text-gray-400">
              Loading movies...
            </div>

          ) : (

            <MovieList
              movies={filteredMovies}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />

          )}

        </section>

      </main>


      {/* Movie Form */}
      {showForm && (

        <MovieForm
          movie={editingMovie}
          onSubmit={handleSubmitMovie}
          onCancel={() => {
            setShowForm(false);
            setEditingMovie(null);
          }}
        />

      )}


      {/* Login Modal */}
      {showLogin && !loggedIn && (

        <Login
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />

      )}

      {showPayment && (
        <Payment
          onClose={() => setShowPayment(false)}
        />
      )}

    </div>
  );
}

export default App;