import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaNewspaper,
  FaFolderOpen,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="mb-10 border-b border-gray-700 pb-6">
          <h1 className="text-2xl font-bold">
            Newsletter CMS
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Administrator Panel
          </p>
        </div>

        <nav className="space-y-2">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`
            }
          >
            <FaNewspaper />
            Posts
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`
            }
          >
            <FaFolderOpen />
            Categories
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`
            }
          >
            <FaUsers />
            Users
          </NavLink>

        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition rounded-lg px-4 py-3"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;