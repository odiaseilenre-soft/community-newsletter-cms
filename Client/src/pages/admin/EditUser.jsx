import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userService";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await getUserById(id);

      setFormData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, formData);

      alert("User updated successfully");

      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-3xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">
        Edit User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Role
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="member">Member</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;