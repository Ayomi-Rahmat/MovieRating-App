import { useState } from "react";
import { login } from "../services/authService";

function Login({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await login(username, password);

      console.log("Login response:", response);

      setMessage("Login successful!");

      // Tell App.jsx login succeeded
      onLogin();

    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-[#12110f] border border-[#332d24] rounded-xl p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#f5f1e8]">
            Welcome back
          </h2>

          <p className="text-gray-400 mt-2">
            Log in to your Reel Rating account.
          </p>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 bg-[#1c1a17] border border-[#332d24] rounded-md text-white outline-none focus:border-[#d9a441]"
            />
          </div>


          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 bg-[#1c1a17] border border-[#332d24] rounded-md text-white outline-none focus:border-[#d9a441]"
            />
          </div>


          {/* Message */}
          {message && (
            <p
              className={`text-sm ${
                message === "Login successful!"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}


          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#d9a441] text-black font-medium rounded-md hover:bg-[#e5b85d] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>


          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;