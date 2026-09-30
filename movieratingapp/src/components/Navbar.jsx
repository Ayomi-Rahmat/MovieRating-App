import {
  Search,
  LogOut,
  Crown,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  logout,
} from "../services/authService";

import { useState } from "react";


function Navbar() {

  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");


  const handleLogout = () => {

    logout();

    navigate("/login");
  };


  const handleSearch = (event) => {

    event.preventDefault();


    if (!search.trim()) {
      return;
    }


    navigate(
      `/movies?search=${encodeURIComponent(
        search
      )}`
    );

    setSearch("");
    setMenuOpen(false);
  };


  return (
    <nav className="navbar">

      <div className="navbar-inner">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
        >
          MOVIE<span>RATING</span>
        </Link>


        {/* DESKTOP SEARCH */}
        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >

          <Search size={18} />

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </form>


        {/* DESKTOP NAV */}
        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/movies">
            Movies
          </Link>

          <Link to="/series">
            Series
          </Link>

          <Link to="/tv-shows">
            TV Shows
          </Link>

          <Link to="/animation">
            Animation
          </Link>

        </div>


        {/* ACTIONS */}
        <div className="navbar-actions">

          <button
            className="premium-button"
            onClick={() =>
              navigate("/payment")
            }
          >
            <Crown size={17} />
            Premium
          </button>


          <button
            className="icon-button"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>


          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen
              ? <X />
              : <Menu />
            }
          </button>

        </div>

      </div>


      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="mobile-menu">

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            to="/movies"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Movies
          </Link>

          <Link
            to="/series"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Series
          </Link>

          <Link
            to="/tv-shows"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            TV Shows
          </Link>

          <Link
            to="/animation"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Animation
          </Link>

          <button
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      )}

    </nav>
  );
}

export default Navbar;