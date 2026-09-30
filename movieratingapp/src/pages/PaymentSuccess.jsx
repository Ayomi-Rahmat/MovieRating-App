import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  verifyPayment,
} from "../services/paymentService";


function PaymentSuccess() {

  const [
    searchParams
  ] = useSearchParams();


  const [
    payment,
    setPayment
  ] = useState(null);


  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const verify =
      async () => {

        try {

          const reference =
            searchParams.get(
              "paymentReference"
            ) ||
            localStorage.getItem(
              "paymentReference"
            );


          if (!reference) {

            throw new Error(
              "No payment reference was found."
            );
          }


          const data =
            await verifyPayment(
              reference
            );


          setPayment(data);

        } catch (error) {

          setError(
            error.message
          );

        } finally {

          setLoading(false);
        }
      };


    verify();

  }, [searchParams]);


  return (
    <div className="app">

      <Navbar />


      <main className="payment-page">

        <div className="payment-card">

          {loading && (

            <>

              <h1>
                Verifying payment...
              </h1>

              <p>
                Please wait while we
                confirm your transaction.
              </p>

            </>

          )}


          {!loading &&
            error && (

            <>

              <h1>
                Payment verification failed
              </h1>

              <div className="error-message">
                {error}
              </div>

              <Link
                to="/payment"
                className="primary-button"
              >
                Try Again
              </Link>

            </>

          )}


          {!loading &&
            !error &&
            payment && (

            <>

              <h1>
                Payment Status
              </h1>

              <p>
                Status:{" "}
                <strong>
                  {payment.paymentStatus}
                </strong>
              </p>


              {payment.paymentStatus ===
                "PAID" ? (

                <div className="success-message">
                  Your payment has been
                  successfully verified.
                </div>

              ) : (

                <div className="error-message">
                  Your payment has not
                  been confirmed as paid.
                </div>

              )}


              <Link
                to="/"
                className="primary-button"
              >
                Back to Home
              </Link>

            </>

          )}

        </div>

      </main>

    </div>
  );
}

export default PaymentSuccess;