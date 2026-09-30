import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    registerAdmin,
    loginAdmin,
} from "../services/adminService";
import "../../styles/admin.css";

function AdminAuth({ mode }) {
    const navigate = useNavigate();

    const isLogin = mode === "login";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accessCode, setAccessCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (isLogin) {
                const response = await loginAdmin(
                    username,
                    password
                );

                const token = response?.data;

                if (!token) {
                    throw new Error(
                        "Login succeeded but no token was returned."
                    );
                }

                localStorage.setItem("adminToken", token);

                navigate("/admin");
            } else {
                const response = await registerAdmin(
                    username,
                    password,
                    accessCode
                );

                setSuccess(
                    response?.message ||
                    "Admin account created successfully."
                );

                setUsername("");
                setPassword("");
                setAccessCode("");

                setTimeout(() => {
                    navigate("/admin/login");
                }, 1200);
            }
        } catch (err) {
            setError(
                err.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-auth-page">

            <div className="admin-auth-card">

                <div className="admin-auth-header">
                    <span className="admin-badge">
                        ADMIN
                    </span>

                    <h1>
                        {isLogin
                            ? "Admin Login"
                            : "Create Admin Account"}
                    </h1>

                    <p>
                        {isLogin
                            ? "Sign in to manage your movie rating system."
                            : "Create an administrator account for Reel Rating."}
                    </p>
                </div>

                {error && (
                    <div className="admin-alert admin-alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="admin-alert admin-alert-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="admin-form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter admin username"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="admin-form-group">
                            <label>Admin Access Code</label>

                            <input
                                type="password"
                                value={accessCode}
                                onChange={(e) =>
                                    setAccessCode(e.target.value)
                                }
                                placeholder="Enter access code"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="admin-primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Sign In"
                                : "Create Admin"}
                    </button>

                </form>

                <div className="admin-auth-footer">

                    {isLogin ? (
                        <>
                            <span>
                                Need an admin account?
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/register")
                                }
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            <span>
                                Already have an admin account?
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/login")
                                }
                            >
                                Login
                            </button>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}

export default AdminAuth;