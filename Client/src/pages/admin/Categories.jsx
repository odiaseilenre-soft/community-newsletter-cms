import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import CategoryForm from "../../components/categories/CategoryForm";

import {
  getCategories,
  createCategory,
} from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create category
  const handleCreateCategory = async (data) => {
    try {
      await createCategory(data);

      await fetchCategories();

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Manage Categories
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaPlus />
          New Category
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search categories..."
        className="w-full rounded-lg border p-3"
      />

      {/* Content */}
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          No categories found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Slug</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">
                    {category.slug}
                  </td>

                  <td className="px-6 py-4">
                    {category.isActive ? "Active" : "Inactive"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    Edit | Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Category Modal */}
      {showModal && (
        <CategoryForm
          onSubmit={handleCreateCategory}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Categories;