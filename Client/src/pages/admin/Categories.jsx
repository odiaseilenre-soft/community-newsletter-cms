import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import CategoryForm from "../../components/categories/CategoryForm";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to load categories."
      );
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

      toast.success("Category created successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create category."
      );
    }
  };

  // Edit category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  // Update category
  const handleUpdateCategory = async (data) => {
    try {
      await updateCategory(
        editingCategory._id,
        data
      );

      await fetchCategories();

      setShowModal(false);
      setEditingCategory(null);

      toast.success("Category updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update category."
      );
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(id);

      setCategories((prev) =>
        prev.filter(
          (category) => category._id !== id
        )
      );

      toast.success("Category deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };

  // Open create modal
  const handleNewCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Manage Categories
        </h1>

        <button
          onClick={handleNewCategory}
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
                <th className="px-6 py-3 text-left">
                  Name
                </th>

                <th className="px-6 py-3 text-left">
                  Slug
                </th>

                <th className="px-6 py-3 text-left">
                  Status
                </th>

                <th className="px-6 py-3 text-right">
                  Actions
                </th>
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
                    {category.isActive
                      ? "Active"
                      : "Inactive"}
                  </td>

                  <td className="px-6 py-4 text-right">

                    <button
                      onClick={() =>
                        handleEditCategory(category)
                      }
                      className="mr-3 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteCategory(
                          category._id
                        )
                      }
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

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
          initialData={editingCategory || {}}
          onSubmit={
            editingCategory
              ? handleUpdateCategory
              : handleCreateCategory
          }
          onCancel={handleCloseModal}
        />
      )}

    </div>
  );
};

export default Categories;