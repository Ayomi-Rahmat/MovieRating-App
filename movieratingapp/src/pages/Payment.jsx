import { useState } from "react";
import { X, CreditCard } from "lucide-react";
import { initiatePayment } from "../services/paymentService";

function Payment({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await initiatePayment(email);

      console.log("Payment initialized:", data);

      // Send the customer to Monnify's payment page
      window.location.href = data.checkoutUrl;

    } catch (err) {
      console.error("Payment error:", err);

      setError(
        err.message || "Unable to start payment."
      );

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

      <div className="relative w-full max-w-md bg-[#12110f] border border-[#332d24] rounded-xl p-8 shadow-2xl">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* HEADER */}
        <div className="mb-6">

          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#d9a441]/10 rounded-lg">
              <CreditCard
                size={22}
                className="text-[#d9a441]"
              />
            </div>

            <h2 className="text-2xl font-semibold text-[#f5f1e8]">
              Reel Rating VIP
            </h2>
          </div>

          <p className="text-gray-400">
            Unlock access to Reel Rating VIP.
          </p>

        </div>

        {/* PRICE */}
        <div className="mb-6 p-4 bg-[#1c1a17] rounded-lg border border-[#332d24]">

          <p className="text-sm text-gray-400">
            VIP Subscription
          </p>

          <p className="text-3xl font-semibold text-[#d9a441] mt-1">
            ₦4,999
          </p>

        </div>

        {/* PAYMENT FORM */}
        <form
          onSubmit={handlePayment}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-[#1c1a17] border border-[#332d24] rounded-md text-white outline-none focus:border-[#d9a441]"
            />

            <p className="text-xs text-gray-500 mt-2">
              This email will be used for your payment.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="p-3 bg-red-950/30 border border-red-900 rounded-md">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* PAY BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#d9a441] text-black font-medium rounded-md hover:bg-[#e5b85d] transition disabled:opacity-50"
          >
            {loading
              ? "Preparing payment..."
              : "Pay ₦4,999"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Payment;