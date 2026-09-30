import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import TVShows from "./pages/TVShows";
import Animation from "./pages/Animation";
import MovieDetails from "./pages/MovieDetails";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminAuth from "./admin/pages/AdminAuth";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminRoute from "./admin/components/AdminRoute";


function App() {
  return (
    <Routes>

      {/* ================================
          AUTHENTICATION
          ================================ */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ================================
          PUBLIC MOVIE PAGES
          ================================ */}

      <Route
        path="/movies"
        element={<Movies />}
      />

      <Route
        path="/series"
        element={<Series />}
      />

      <Route
        path="/tv-shows"
        element={<TVShows />}
      />

      <Route
        path="/animation"
        element={<Animation />}
      />

      <Route
        path="/movie/:id"
        element={<MovieDetails />}
      />


      {/* ================================
          PROTECTED HOME PAGE
          ================================ */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />


      {/* ================================
          PROTECTED PAYMENT PAGE
          ================================ */}

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />


      {/* ================================
          PAYMENT SUCCESS
          ================================ */}

      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      {/* ================================
          ADMIN DASHBOARD
          ================================ */}

      <Route
                path="/admin/login"
                element={
                    <AdminAuth mode="login" />
                }
            />

            <Route
                path="/admin/register"
                element={
                    <AdminAuth mode="register" />
                }
            />

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />

             {/* ================================
          UNKNOWN URL
          ================================ */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;