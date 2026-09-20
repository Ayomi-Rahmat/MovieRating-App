import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader } from "lucide-react";

function PaymentSuccess() {
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState(
    "Checking your payment..."
  );

  useEffect(() => {

    const verifyPayment = async () => {

      // Get information Monnify sent back in the URL
      const params =
        new URLSearchParams(
          window.location.search
        );

      const paymentReference =
        params.get("paymentReference");

      const paymentStatus =
        params.get("paymentStatus");

      console.log(
        "Payment reference:",
        paymentReference
      );

      console.log(
        "Payment status from Monnify:",
        paymentStatus
      );


      // We need the payment reference
      if (!paymentReference) {

        setStatus("failed");

        setMessage(
          "No payment reference was found."
        );

        return;
      }


      try {

        // Ask OUR BACKEND to verify with Monnify
        const response = await fetch(
          `http://localhost:8081/api/payment/verify?paymentReference=${encodeURIComponent(
            paymentReference
          )}`
        );

        if (!response.ok) {
          throw new Error(
            "Payment verification failed."
          );
        }

        const payment =
          await response.json();

        console.log(
          "Verified payment:",
          payment
        );


        // Check payment status
        if (
          payment.paymentStatus === "PAID"
          &&
          Number(payment.amountPaid) >= 4999
        ) {

          setStatus("success");

          setMessage(
            "Your payment was successful! VIP access has been confirmed."
          );

        } else {

          setStatus("failed");

          setMessage(
            "We could not confirm your payment."
          );
        }

      } catch (error) {

        console.error(
          "Verification error:",
          error
        );

        setStatus("failed");

        setMessage(
          "We were unable to verify your payment. Please try again."
        );
      }
    };


    verifyPayment();

  }, []);


  return (
    <div className="min-h-screen bg-[#12110f] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#1c1a17] border border-[#332d24] rounded-xl p-8 text-center">

        {/* CHECKING */}
        {status === "checking" && (
          <>
            <Loader
              size={50}
              className="text-[#d9a441] mx-auto mb-5 animate-spin"
            />

            <h1 className="text-2xl font-semibold text-white">
              Checking payment
            </h1>

            <p className="text-gray-400 mt-3">
              Please wait while we confirm your payment with Monnify.
            </p>
          </>
        )}


        {/* SUCCESS */}
        {status === "success" && (
          <>
            <CheckCircle
              size={60}
              className="text-green-400 mx-auto mb-5"
            />

            <h1 className="text-2xl font-semibold text-white">
              Payment Successful!
            </h1>

            <p className="text-gray-400 mt-3">
              {message}
            </p>

            <button
              onClick={() =>
                window.location.href = "/"
              }
              className="mt-6 px-6 py-3 bg-[#d9a441] text-black rounded-md hover:bg-[#e5b85d] transition"
            >
              Back to Reel Rating
            </button>
          </>
        )}


        {/* FAILED */}
        {status === "failed" && (
          <>
            <XCircle
              size={60}
              className="text-red-400 mx-auto mb-5"
            />

            <h1 className="text-2xl font-semibold text-white">
              Payment Could Not Be Confirmed
            </h1>

            <p className="text-gray-400 mt-3">
              {message}
            </p>

            <button
              onClick={() =>
                window.location.href = "/"
              }
              className="mt-6 px-6 py-3 border border-[#d9a441] text-[#d9a441] rounded-md hover:bg-[#d9a441] hover:text-black transition"
            >
              Back to Reel Rating
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default PaymentSuccess;