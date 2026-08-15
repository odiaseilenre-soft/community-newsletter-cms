import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) return;

    navigate(`/search?search=${encodeURIComponent(trimmedSearch)}`);

    setSearch("");
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

          {/* Admin Login */}
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
          >
            Admin Login
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;