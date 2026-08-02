import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getUsers,
  deleteUser,
  toggleUserStatus,
} from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, [search]);

  const loadUsers = async () => {
    try {
      const response = await getUsers(search);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleUserStatus(id);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update user status.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">
          Loading users...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Username</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="p-4">
                    {user.username}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4 capitalize">
                    {user.role}
                  </td>

                  <td className="p-4">
                    {user.isActive ? (
                      <span className="text-green-600 font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="p-4 flex gap-2">

                    <Link
                      to={`/admin/users/${user._id}/edit`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleToggleStatus(user._id)}
                      className={`px-3 py-1 rounded text-white ${
                        user.isActive
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Users;