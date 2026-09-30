import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";

import {
  getMovieById,
} from "../services/movieService";

import {
  addRating,
  updateRating,
  getRatingsForMovie,
} from "../services/ratingService";


function MovieDetails() {

  const { id } =
    useParams();


  // =========================================================
  // MOVIE
  // =========================================================

  const [movie, setMovie] =
    useState(null);


  // =========================================================
  // RATINGS
  // =========================================================

  const [ratings, setRatings] =
    useState([]);


  const [hasRatings, setHasRatings] =
    useState(false);


  const [canViewAllRatings, setCanViewAllRatings] =
    useState(false);


  // =========================================================
  // RATING FORM
  // =========================================================

  const [score, setScore] =
    useState(5);


  const [reviewText, setReviewText] =
    useState("");


  const [editingRating, setEditingRating] =
    useState(null);


  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  // =========================================================
  // GET CURRENT USER'S RATING
  // =========================================================

  const myRating =
    ratings.find(
      (rating) =>
        rating.mine === true
    );


  // =========================================================
  // LOAD MOVIE + RATINGS
  // =========================================================

  useEffect(() => {

    const loadMovie =
      async () => {

        try {

          const [
            movieData,
            ratingsData,
          ] = await Promise.all([
            getMovieById(id),
            getRatingsForMovie(id),
          ]);


          setMovie(
            movieData
          );


          setRatings(
            ratingsData.ratings || []
          );


          setHasRatings(
            ratingsData.hasRatings
          );


          setCanViewAllRatings(
            ratingsData.canViewAllRatings
          );

        } catch (error) {

          setError(
            error.message
          );

        } finally {

          setLoading(false);
        }
      };


    loadMovie();

  }, [id]);


  // =========================================================
  // SUBMIT OR UPDATE RATING
  // =========================================================

  const handleRating =
    async (event) => {

      event.preventDefault();


      setMessage("");
      setError("");


      try {

        // ===================================================
        // UPDATE EXISTING RATING
        // ===================================================

        if (editingRating) {

          await updateRating({
            ratingId:
              editingRating.id,

            movieId:
              Number(id),

            score,

            reviewText,
          });


          setMessage(
            "Your rating was updated successfully."
          );

        }


        // ===================================================
        // ADD NEW RATING
        // ===================================================

        else {

          await addRating({
            movieId:
              Number(id),

            score,

            reviewText,
          });


          setMessage(
            "Your rating was submitted successfully."
          );
        }


        // Clear form
        setReviewText("");


        // Exit edit mode
        setEditingRating(null);


        // ===================================================
        // REFRESH MOVIE
        // ===================================================

        const updatedMovie =
          await getMovieById(id);


        setMovie(
          updatedMovie
        );


        // ===================================================
        // REFRESH RATINGS
        // ===================================================

        const updatedRatings =
          await getRatingsForMovie(id);


        setRatings(
          updatedRatings.ratings || []
        );


        setHasRatings(
          updatedRatings.hasRatings
        );


        setCanViewAllRatings(
          updatedRatings.canViewAllRatings
        );

      } catch (error) {

        setError(
          error.message
        );
      }
    };


  // =========================================================
  // START EDITING
  // =========================================================

  const handleEditRating =
    (rating) => {

      setEditingRating(
        rating
      );


      setScore(
        rating.score
      );


      setReviewText(
        rating.reviewText || ""
      );


      setMessage("");
      setError("");


      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };


  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const handleCancelEdit =
    () => {

      setEditingRating(null);

      setScore(5);

      setReviewText("");

      setMessage("");

      setError("");
    };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <>

        <Navbar />

        <div className="loading">
          Loading movie...
        </div>

      </>
    );
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error && !movie) {

    return (
      <>

        <Navbar />

        <div className="error-page">
          {error}
        </div>

      </>
    );
  }


  // =========================================================
  // MOVIE DETAILS
  // =========================================================

  return (
    <div className="app">

      <Navbar />


      <main className="content-container movie-details">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Link
          to="/movies"
          className="back-link"
        >
          ← Back to Movies
        </Link>


        {/* =================================================
            MOVIE HEADER
        ================================================= */}

        <section className="movie-detail-header">

          <div className="detail-poster">

            {movie.title
              ?.charAt(0)
              ?.toUpperCase()}

          </div>


          <div className="movie-detail-content">

            <span className="detail-type">

              {movie.movieType ||
                movie.type ||
                "MOVIE"}

            </span>


            <h1>
              {movie.title}
            </h1>


            <div className="detail-meta">

              <span>
                {movie.genre}
              </span>


              <span>
                {movie.releaseYear}
              </span>


              <span>

                <Star
                  size={16}
                  fill="currentColor"
                />

                {movie.averageRating !== null &&
                movie.averageRating !== undefined
                  ? Number(
                      movie.averageRating
                    ).toFixed(1)
                  : "0.0"}

              </span>


              <span>
                {movie.totalRating || 0} ratings
              </span>

            </div>


            <p>
              {movie.description ||
                "No description available."}
            </p>

          </div>

        </section>


        {/* =================================================
            RATING SECTION
        ================================================= */}

        <section className="rating-section">

          <h2>

            {editingRating
              ? "Edit your rating"
              : "Rate this movie"}

          </h2>


          {/* SUCCESS MESSAGE */}

          {message && (

            <div className="success-message">
              {message}
            </div>

          )}


          {/* ERROR MESSAGE */}

          {error && (

            <div className="error-message">
              {error}
            </div>

          )}


          {/* =================================================
              EXISTING RATING
          ================================================= */}

          {myRating &&
          !editingRating && (

            <div className="review-card">

              <strong>
                Your Rating
              </strong>


              <div className="review-score">

                <Star
                  size={15}
                  fill="currentColor"
                />

                {myRating.score}/5

              </div>


              <p>

                {myRating.reviewText ||
                  "You did not write a review."}

              </p>


              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  handleEditRating(
                    myRating
                  )
                }
              >
                Edit Rating
              </button>

            </div>

          )}


          {/* =================================================
              RATING FORM
          ================================================= */}

          <form
            onSubmit={handleRating}
            className="rating-form"
          >

            <label>

              Your rating

              <select
                value={score}
                onChange={(e) =>
                  setScore(
                    Number(
                      e.target.value
                    )
                  )
                }
              >

                <option value="1">
                  1 Star
                </option>

                <option value="2">
                  2 Stars
                </option>

                <option value="3">
                  3 Stars
                </option>

                <option value="4">
                  4 Stars
                </option>

                <option value="5">
                  5 Stars
                </option>

              </select>

            </label>


            <label>

              Review

              <textarea
                value={reviewText}
                onChange={(e) =>
                  setReviewText(
                    e.target.value
                  )
                }
                placeholder="Write your review..."
                maxLength={500}
              />

            </label>


            <div>

              <button
                type="submit"
                className="primary-button"
              >

                {editingRating
                  ? "Update Rating"
                  : "Submit Rating"}

              </button>


              {editingRating && (

                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    handleCancelEdit
                  }
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>


        {/* =================================================
            REVIEWS SECTION
        ================================================= */}

        <section className="reviews-section">

          <h2>
            Reviews
          </h2>


          {/* =================================================
              NO RATINGS EXIST
          ================================================= */}

          {!hasRatings && (

            <p className="empty-text">
              No reviews yet. Be the first to rate this movie!
            </p>

          )}


          {/* =================================================
              RATINGS EXIST BUT USER IS NOT PREMIUM
          ================================================= */}

          {hasRatings &&
          !canViewAllRatings && (

            <>

              {/* Show user's own rating if they have one */}

              {myRating && (

                <article className="review-card">

                  <strong>
                    Your Review
                  </strong>


                  <div className="review-score">

                    <Star
                      size={15}
                      fill="currentColor"
                    />

                    {myRating.score}/5

                  </div>


                  <p>

                    {myRating.reviewText ||
                      "No written review."}

                  </p>

                </article>

              )}


              {/* Premium lock */}

              <div className="premium-review-lock">

                <h3>
                  🔒 Premium Feature
                </h3>


                <p>
                  This movie has ratings and reviews
                  from other users.
                </p>


                <p>
                  Upgrade to Premium to see what
                  other users think about this movie.
                </p>


                <Link
                  to="/premium"
                  className="primary-button"
                >
                  Upgrade to Premium
                </Link>

              </div>

            </>

          )}


          {/* =================================================
              PREMIUM USER — SHOW ALL REVIEWS
          ================================================= */}

          {hasRatings &&
          canViewAllRatings && (

            <div className="reviews-list">

              {ratings.map(
                (rating) => (

                  <article
                    key={rating.id}
                    className="review-card"
                  >

                    <strong>
                      {rating.username}
                    </strong>


                    <div className="review-score">

                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      {rating.score}/5

                    </div>


                    <p>

                      {rating.reviewText ||
                        "No written review."}

                    </p>

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default MovieDetails;