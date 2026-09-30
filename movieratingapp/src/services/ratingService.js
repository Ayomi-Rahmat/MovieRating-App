const API_URL = "http://localhost:8081";


// ================================
// ADD RATING
// ================================

export const addRating = async ({
  movieId,
  score,
  reviewText,
}) => {

  const token =
    localStorage.getItem(
      "movieRatingToken"
    );

  const response =
    await fetch(
      `${API_URL}/api/ratings`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          movieId,
          score,
          reviewText,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to submit rating"
    );
  }

  return data;
};


// ================================
// UPDATE RATING
// ================================

export const updateRating = async ({
  ratingId,
  movieId,
  score,
  reviewText,
}) => {

  const token =
    localStorage.getItem(
      "movieRatingToken"
    );

  const response =
    await fetch(
      `${API_URL}/api/ratings/${ratingId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          movieId,
          score,
          reviewText,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Unable to update rating"
    );
  }

  return data;
};


// ================================
// GET MOVIE RATINGS
// ================================

export const getRatingsForMovie =
  async (movieId) => {

    const token =
      localStorage.getItem(
        "movieRatingToken"
      );

    const headers = {};

    if (token) {
      headers.Authorization =
        `Bearer ${token}`;
    }

    const response =
      await fetch(
        `${API_URL}/api/ratings/movie/${movieId}`,
        {
          headers,
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Unable to load ratings"
      );
    }

    return data;
  };