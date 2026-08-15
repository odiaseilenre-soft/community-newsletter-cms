import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration successful!");

      console.log("Registration response:", response);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <p className="text-sm text-gray-500 mt-1">
            At least 8 characters with uppercase, lowercase,
            number and special character.
          </p>
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded p-3"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;