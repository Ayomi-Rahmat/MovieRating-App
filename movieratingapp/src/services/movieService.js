const API_URL = "http://localhost:8081/movies";


// =========================================================
// GET ALL MOVIES
// =========================================================

export const getMovies = async ({
  genre = "",
  movieType = "",
  minRating = "",
} = {}) => {

  const params =
    new URLSearchParams();


  if (genre) {
    params.append(
      "genre",
      genre
    );
  }


  if (movieType) {
    params.append(
      "movieType",
      movieType
    );
  }


  if (
    minRating !== "" &&
    minRating !== null
  ) {
    params.append(
      "minRating",
      minRating
    );
  }


  const queryString =
    params.toString();


  const url =
    queryString
      ? `${API_URL}?${queryString}`
      : API_URL;


  const response =
    await fetch(url);


  if (!response.ok) {

    throw new Error(
      "Failed to fetch movies"
    );
  }


  return response.json();
};


// =========================================================
// SEARCH MOVIES
// =========================================================

export const searchMovies = async (
  query
) => {

  const params =
    new URLSearchParams();


  if (query) {

    params.append(
      "search",
      query
    );
  }


  const queryString =
    params.toString();


  const url =
    queryString
      ? `${API_URL}?${queryString}`
      : API_URL;


  const response =
    await fetch(url);


  if (!response.ok) {

    throw new Error(
      "Failed to search movies"
    );
  }


  return response.json();
};


// =========================================================
// GET MOVIE BY ID
// =========================================================

export const getMovieById =
  async (id) => {

    const response =
      await fetch(
        `${API_URL}/${id}`
      );


    if (!response.ok) {

      throw new Error(
        "Failed to fetch movie"
      );
    }


    return response.json();
  };