const API_URL = "http://localhost:8081/movies";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};


// =============================
// GET ALL MOVIES
// =============================

export const getMovies = async (genre = "", minRating = "") => {
  const params = new URLSearchParams();

  if (genre) {
    params.append("genre", genre);
  }

  if (minRating) {
    params.append("minRating", minRating);
  }

  const url = params.toString()
    ? `${API_URL}?${params.toString()}`
    : API_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await response.json();
};


// =============================
// GET ONE MOVIE
// =============================

export const getMovieById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Movie not found");
  }

  return await response.json();
};


// =============================
// CREATE MOVIE
// =============================

export const createMovie = async (movie) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(movie),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create movie");
  }

  return data.data;
};


// =============================
// UPDATE MOVIE
// =============================

export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(movie),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update movie");
  }

  return data.data;
};


// =============================
// DELETE MOVIE
// =============================

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }

  return await response.text();
};