import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) return;

    navigate(
      `/search?search=${encodeURIComponent(trimmedSearch)}`
    );

    setSearch("");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16 gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 whitespace-nowrap"
          >
            Community Newsletter
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }
            >
              Categories
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }
            >
              Contact
            </NavLink>

          </nav>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center"
          >
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search..."
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* Authentication */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
              >
                Register
              </Link>

            </div>
          ) : (
            <div className="flex items-center gap-4">

              {/* User information */}
              <span className="text-gray-700 whitespace-nowrap">
                Hi,{" "}
                <span className="font-semibold">
                  {user?.firstName || user?.username}
                </span>
              </span>

              {/* Admin Dashboard */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                >
                  Dashboard
                </Link>
              )}

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition whitespace-nowrap"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;