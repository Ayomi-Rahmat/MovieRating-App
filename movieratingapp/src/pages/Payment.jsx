import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  initiatePayment,
} from "../services/paymentService";


function Payment() {

  const navigate =
    useNavigate();


  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handlePayment =
    async (event) => {

      event.preventDefault();

      setError("");
      setLoading(true);


      try {

        const payment =
          await initiatePayment(
            email
          );


        if (
          !payment.checkoutUrl
        ) {

          throw new Error(
            "Payment checkout URL was not returned."
          );
        }


        // Save reference so the
        // success page can verify it.

        localStorage.setItem(
          "paymentReference",
          payment.paymentReference
        );


        window.location.href =
          payment.checkoutUrl;

      } catch (error) {

        setError(
          error.message
        );

        setLoading(false);
      }
    };


  return (
    <div className="app">

      <Navbar />


      <main className="payment-page">

        <div className="payment-card">

          <span className="premium-label">
            PREMIUM
          </span>


          <h1>
            Unlock Premium
          </h1>


          <p>
            Get access to the premium
            Movie Rating experience.
          </p>


          <div className="payment-price">
            ₦4,999
          </div>


          {error && (

            <div className="error-message">
              {error}
            </div>

          )}


          <form
            onSubmit={handlePayment}
            className="auth-form"
          >

            <label>
              Email address

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                required
              />

            </label>


            <button
              type="submit"
              className="primary-button full-width"
              disabled={loading}
            >

              {loading
                ? "Preparing payment..."
                : "Pay ₦4,999"}

            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Payment;