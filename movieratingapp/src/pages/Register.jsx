import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  register,
} from "../services/authService";


function Register() {

  const navigate =
    useNavigate();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");


      if (
        password !== confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;
      }


      setLoading(true);


      try {

        await register(
          username,
          password
        );


        // Registration does NOT
        // automatically log the user in.
        //
        // We send them to login.

        navigate("/login");

      } catch (error) {

        setError(
          error.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          MOVIE<span>RATING</span>
        </div>


        <h1>
          Create your account
        </h1>

        <p className="auth-subtitle">
          Join Movie Rating and discover
          movies worth watching.
        </p>


        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <label>
            Username

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Choose a username"
              required
            />

          </label>


          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Create a password"
              required
            />

          </label>


          <label>
            Confirm Password

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm your password"
              required
            />

          </label>


          <button
            type="submit"
            className="primary-button full-width"
            disabled={loading}
          >

            {loading
              ? "Creating account..."
              : "Create Account"}

          </button>

        </form>


        <p className="auth-switch">

          Already have an account?

          {" "}

          <Link to="/login">
            Log in
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;