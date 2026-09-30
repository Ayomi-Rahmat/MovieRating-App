import { useEffect, useState } from "react";

import {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getCurrentAdmin,
    getUsers,
    blockUser,
    unblockUser,
    makePremium,
    removePremium,
    deleteUser,
} from "../services/adminService";

import "../../styles/admin.css";

function AdminDashboard() {

    // ===============================
    // MOVIE STATE
    // ===============================

    const [movies, setMovies] = useState([]);

    // ===============================
    // USER STATE
    // ===============================

    const [users, setUsers] = useState([]);

    // ===============================
    // ADMIN STATE
    // ===============================

    const [admin, setAdmin] = useState(null);

    // ===============================
    // GENERAL STATE
    // ===============================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [usersLoading, setUsersLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ===============================
    // MOVIE EDITING
    // ===============================

    const [editingMovie, setEditingMovie] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        genre: "",
        movieType: "MOVIE",
        releaseYear: "",
        premiumOnly: false,
    });

    // ===============================
    // LOAD DASHBOARD
    // ===============================

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                moviesResponse,
                adminResponse,
                usersResponse
            ] = await Promise.all([
                getMovies(),
                getCurrentAdmin(),
                getUsers(),
            ]);

            // Movies

            setMovies(
                Array.isArray(moviesResponse)
                    ? moviesResponse
                    : moviesResponse?.data || []
            );

            // Admin

            setAdmin(
                adminResponse?.data || null
            );

            // Users

            setUsers(
                Array.isArray(usersResponse)
                    ? usersResponse
                    : usersResponse?.data || []
            );

        } catch (err) {

            setError(
                err.message ||
                "Unable to load admin dashboard."
            );

        } finally {

            setLoading(false);
        }
    };

    // ===============================
    // INITIAL LOAD
    // ===============================

    useEffect(() => {

        let isMounted = true;

        const initializeDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    moviesResponse,
                    adminResponse,
                    usersResponse
                ] = await Promise.all([
                    getMovies(),
                    getCurrentAdmin(),
                    getUsers(),
                ]);

                if (!isMounted) return;

                setMovies(
                    Array.isArray(moviesResponse)
                        ? moviesResponse
                        : moviesResponse?.data || []
                );

                setAdmin(
                    adminResponse?.data || null
                );

                setUsers(
                    Array.isArray(usersResponse)
                        ? usersResponse
                        : usersResponse?.data || []
                );

            } catch (err) {

                if (!isMounted) return;

                setError(
                    err.message ||
                    "Unable to load admin dashboard."
                );

            } finally {

                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void initializeDashboard();

        return () => {
            isMounted = false;
        };

    }, []);

    // ===============================
    // MOVIE FORM
    // ===============================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {

        setForm({
            title: "",
            description: "",
            genre: "",
            movieType: "MOVIE",
            releaseYear: "",
            premiumOnly: false,
        });

        setEditingMovie(null);
    };

    // ===============================
    // ADD / UPDATE MOVIE
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);

        const movieData = {
            title: form.title,
            description: form.description,
            genre: form.genre,
            movieType: form.movieType,
            releaseYear: Number(form.releaseYear),
            premiumOnly: form.premiumOnly,
        };

        try {

            if (editingMovie) {

                await updateMovie(
                    editingMovie.id,
                    movieData
                );

                setSuccess(
                    "Movie updated successfully."
                );

            } else {

                await addMovie(movieData);

                setSuccess(
                    "Movie added successfully."
                );
            }

            resetForm();

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to save movie."
            );

        } finally {

            setSaving(false);
        }
    };

    // ===============================
    // EDIT MOVIE
    // ===============================

    const handleEdit = (movie) => {

        setEditingMovie(movie);

        setForm({
            title: movie.title || "",
            description: movie.description || "",
            genre: movie.genre || "",
            movieType: movie.movieType || "MOVIE",
            releaseYear: movie.releaseYear || "",
            premiumOnly: movie.premiumOnly || false,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ===============================
    // DELETE MOVIE
    // ===============================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this movie?"
        );

        if (!confirmed) return;

        try {

            setError("");
            setSuccess("");

            await deleteMovie(id);

            setSuccess(
                "Movie deleted successfully."
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to delete movie."
            );
        }
    };

    // ===============================
    // BLOCK USER
    // ===============================

    const handleBlockUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to block this user?"
        );

        if (!confirmed) return;

        try {

            setError("");
            setSuccess("");
            setUsersLoading(true);

            await blockUser(id);

            setSuccess(
                "User blocked successfully."
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to block user."
            );

        } finally {

            setUsersLoading(false);
        }
    };

    // ===============================
    // UNBLOCK USER
    // ===============================

    const handleUnblockUser = async (id) => {

        try {

            setError("");
            setSuccess("");
            setUsersLoading(true);

            await unblockUser(id);

            setSuccess(
                "User unblocked successfully."
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to unblock user."
            );

        } finally {

            setUsersLoading(false);
        }
    };

    // ===============================
    // MAKE PREMIUM
    // ===============================

    const handleMakePremium = async (id) => {

        try {

            setError("");
            setSuccess("");
            setUsersLoading(true);

            await makePremium(id);

            setSuccess(
                "Premium access granted."
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to give premium access."
            );

        } finally {

            setUsersLoading(false);
        }
    };

    // ===============================
    // REMOVE PREMIUM
    // ===============================

    const handleRemovePremium = async (id) => {

        try {

            setError("");
            setSuccess("");
            setUsersLoading(true);

            await removePremium(id);

            setSuccess(
                "Premium access removed."
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to remove premium access."
            );

        } finally {

            setUsersLoading(false);
        }
    };

    // ===============================
    // DELETE USER
    // ===============================

    const handleDeleteUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this user?"
        );

        if (!confirmed) return;

        try {

            setError("");
            setSuccess("");
            setUsersLoading(true);

            await deleteUser(id);

            setSuccess(
                "User deleted successfully."
            );

            await loadDashboard();

        } catch (err) {

            setError(
                err.message ||
                "Unable to delete user."
            );

        } finally {

            setUsersLoading(false);
        }
    };

    // ===============================
    // LOGOUT
    // ===============================

    const logout = () => {

        localStorage.removeItem("adminToken");

        window.location.href = "/admin/login";
    };

    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (
            <div className="admin-loading">
                Loading admin dashboard...
            </div>
        );
    }

    // ===============================
    // MOVIE COUNTS
    // ===============================

    const movieCount = movies.filter(
        (movie) => movie.movieType === "MOVIE"
    ).length;

    const seriesCount = movies.filter(
        (movie) => movie.movieType === "SERIES"
    ).length;

    const animationCount = movies.filter(
        (movie) => movie.movieType === "ANIMATION"
    ).length;

    const tvShowCount = movies.filter(
        (movie) => movie.movieType === "TV_SHOW"
    ).length;

    // ===============================
    // USER COUNTS
    // ===============================

    const activeUsers = users.filter(
        (user) => user.enabled
    ).length;

    const blockedUsers = users.filter(
        (user) => !user.enabled
    ).length;

    const premiumUsers = users.filter(
        (user) => user.premium
    ).length;

    return (

        <div className="admin-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="admin-sidebar">

                <div className="admin-logo">
                    MOVIE <span>RATING</span>
                </div>

                <div className="admin-sidebar-label">
                    ADMIN PANEL
                </div>

                <nav className="admin-nav">

                    <a
                        href="#dashboard"
                        className="admin-nav-link active"
                    >
                        Dashboard
                    </a>

                    <a
                        href="#movies"
                        className="admin-nav-link"
                    >
                        Movies
                    </a>

                    <a
                        href="#users"
                        className="admin-nav-link"
                    >
                        Users
                    </a>

                </nav>

                <button
                    className="admin-logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </aside>

            {/* =========================
                MAIN
            ========================= */}

            <main className="admin-main">

                {/* =========================
                    TOP BAR
                ========================= */}

                <header className="admin-topbar">

                    <div>

                        <p className="admin-eyebrow">
                            ADMIN DASHBOARD
                        </p>

                        <h1>
                            Welcome, {admin?.username || "Admin"}
                        </h1>

                    </div>

                    <div className="admin-profile">

                        <div className="admin-avatar">

                            {(admin?.username || "A")
                                .charAt(0)
                                .toUpperCase()}

                        </div>

                        <div>

                            <strong>
                                {admin?.username || "Admin"}
                            </strong>

                            <span>
                                {admin?.role || "ROLE_ADMIN"}
                            </span>

                        </div>

                    </div>

                </header>

                {/* =========================
                    ALERTS
                ========================= */}

                {error && (
                    <div className="admin-alert admin-alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="admin-alert admin-alert-success">
                        {success}
                    </div>
                )}

                {/* =========================
                    STATS
                ========================= */}

                <section
                    id="dashboard"
                    className="admin-stats"
                >

                    <div className="admin-stat-card">
                        <span>Total Titles</span>
                        <strong>{movies.length}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Movies</span>
                        <strong>{movieCount}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Series</span>
                        <strong>{seriesCount}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Animation</span>
                        <strong>{animationCount}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>TV Shows</span>
                        <strong>{tvShowCount}</strong>
                    </div>

                </section>

                {/* =========================
                    MOVIE FORM
                ========================= */}

                <section className="admin-card">

                    <div className="admin-card-header">

                        <div>

                            <p className="admin-eyebrow">
                                CONTENT MANAGEMENT
                            </p>

                            <h2>
                                {editingMovie
                                    ? "Edit Movie"
                                    : "Add Movie"}
                            </h2>

                        </div>

                        {editingMovie && (

                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={resetForm}
                            >
                                Cancel Edit
                            </button>

                        )}

                    </div>

                    <form
                        className="admin-movie-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="admin-form-group">

                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Movie title"
                                required
                            />

                        </div>

                        <div className="admin-form-group">

                            <label>
                                Genre
                            </label>

                            <input
                                type="text"
                                name="genre"
                                value={form.genre}
                                onChange={handleChange}
                                placeholder="Drama, Action..."
                                required
                            />

                        </div>

                        <div className="admin-form-group">

                            <label>
                                Movie Type
                            </label>

                            <select
                                name="movieType"
                                value={form.movieType}
                                onChange={handleChange}
                            >

                                <option value="MOVIE">
                                    Movie
                                </option>

                                <option value="SERIES">
                                    Series
                                </option>

                                <option value="TV_SHOW">
                                    TV Show
                                </option>

                                <option value="ANIMATION">
                                    Animation
                                </option>

                            </select>

                        </div>

                        <div className="admin-form-group">

                            <label>
                                Release Year
                            </label>

                            <input
                                type="number"
                                name="releaseYear"
                                value={form.releaseYear}
                                onChange={handleChange}
                                placeholder="2026"
                                min="1888"
                                required
                            />

                        </div>

                        <div className="admin-form-group admin-full-width">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Movie description"
                                rows="4"
                            />

                        </div>

                        {/* =========================
                            PREMIUM ACCESS
                        ========================= */}

                        <div className="admin-premium-option admin-full-width">

                            <label className="premium-checkbox">

                                <input
                                    type="checkbox"
                                    name="premiumOnly"
                                    checked={form.premiumOnly}
                                    onChange={handleChange}
                                />

                                <span className="premium-checkmark"></span>

                                <span className="premium-checkbox-text">

                                    <strong>
                                        Premium Only
                                    </strong>

                                    <small>
                                        Only premium users can access this movie.
                                    </small>

                                </span>

                            </label>

                        </div>

                        <div className="admin-full-width">

                            <button
                                type="submit"
                                className="admin-primary-btn"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : editingMovie
                                        ? "Update Movie"
                                        : "Add Movie"}

                            </button>

                        </div>

                    </form>

                </section>

                {/* =========================
                    MOVIES TABLE
                ========================= */}

                <section
                    id="movies"
                    className="admin-card"
                >

                    <div className="admin-card-header">

                        <div>

                            <p className="admin-eyebrow">
                                LIBRARY
                            </p>

                            <h2>
                                All Movies
                            </h2>

                        </div>

                        <span className="admin-count">
                            {movies.length} titles
                        </span>

                    </div>

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Type</th>
                                    <th>Year</th>
                                    <th>Rating</th>
                                    <th>Access</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {movies.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="admin-empty"
                                        >
                                            No movies found.
                                        </td>

                                    </tr>

                                ) : (

                                    movies.map((movie) => (

                                        <tr key={movie.id}>

                                            <td>
                                                <strong>
                                                    {movie.title}
                                                </strong>
                                            </td>

                                            <td>
                                                {movie.genre}
                                            </td>

                                            <td>
                                                <span className="admin-type-badge">
                                                    {movie.movieType}
                                                </span>
                                            </td>

                                            <td>
                                                {movie.releaseYear}
                                            </td>

                                            <td>
                                                {movie.averageRating ?? "0.0"}
                                            </td>

                                            <td>

                                                {movie.premiumOnly ? (

                                                    <span className="admin-status-badge admin-premium-badge">
                                                        Premium
                                                    </span>

                                                ) : (

                                                    <span className="admin-status-badge admin-free-badge">
                                                        Free
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <div className="admin-actions">

                                                    <button
                                                        type="button"
                                                        className="admin-edit-btn"
                                                        onClick={() =>
                                                            handleEdit(movie)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="admin-delete-btn"
                                                        onClick={() =>
                                                            handleDelete(movie.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

                {/* =========================
                    USER MANAGEMENT
                ========================= */}

                <section
                    id="users"
                    className="admin-card"
                >

                    <div className="admin-card-header">

                        <div>

                            <p className="admin-eyebrow">
                                USER MANAGEMENT
                            </p>

                            <h2>
                                All Users
                            </h2>

                        </div>

                        <span className="admin-count">
                            {users.length} users
                        </span>

                    </div>

                    {/* USER SUMMARY */}

                    <div className="admin-stats">

                        <div className="admin-stat-card">

                            <span>
                                Active Users
                            </span>

                            <strong>
                                {activeUsers}
                            </strong>

                        </div>

                        <div className="admin-stat-card">

                            <span>
                                Blocked Users
                            </span>

                            <strong>
                                {blockedUsers}
                            </strong>

                        </div>

                        <div className="admin-stat-card">

                            <span>
                                Premium Users
                            </span>

                            <strong>
                                {premiumUsers}
                            </strong>

                        </div>

                    </div>

                    {/* USERS TABLE */}

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        Username
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Premium
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {users.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="admin-empty"
                                        >
                                            No users found.
                                        </td>

                                    </tr>

                                ) : (

                                    users.map((user) => (

                                        <tr key={user.id}>

                                            <td>

                                                <strong>
                                                    {user.username}
                                                </strong>

                                            </td>

                                            <td>

                                                <span className="admin-type-badge">
                                                    {user.role}
                                                </span>

                                            </td>

                                            <td>

                                                {user.premium ? (

                                                    <span className="admin-status-badge admin-premium-badge">
                                                        Premium
                                                    </span>

                                                ) : (

                                                    <span className="admin-status-badge">
                                                        Standard
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {user.enabled ? (

                                                    <span className="admin-status-badge admin-active-badge">
                                                        Active
                                                    </span>

                                                ) : (

                                                    <span className="admin-status-badge admin-blocked-badge">
                                                        Blocked
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {user.role === "ROLE_ADMIN" ? (

                                                    <span className="admin-protected-text">
                                                        Protected
                                                    </span>

                                                ) : (

                                                    <div className="admin-actions">

                                                        {user.enabled ? (

                                                            <button
                                                                type="button"
                                                                className="admin-delete-btn"
                                                                disabled={usersLoading}
                                                                onClick={() =>
                                                                    handleBlockUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Block
                                                            </button>

                                                        ) : (

                                                            <button
                                                                type="button"
                                                                className="admin-edit-btn"
                                                                disabled={usersLoading}
                                                                onClick={() =>
                                                                    handleUnblockUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Unblock
                                                            </button>

                                                        )}

                                                        {user.premium ? (

                                                            <button
                                                                type="button"
                                                                className="admin-secondary-btn"
                                                                disabled={usersLoading}
                                                                onClick={() =>
                                                                    handleRemovePremium(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Remove Premium
                                                            </button>

                                                        ) : (

                                                            <button
                                                                type="button"
                                                                className="admin-primary-btn"
                                                                disabled={usersLoading}
                                                                onClick={() =>
                                                                    handleMakePremium(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Make Premium
                                                            </button>

                                                        )}

                                                        <button
                                                            type="button"
                                                            className="admin-delete-btn"
                                                            disabled={usersLoading}
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                )}

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;