import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getPosts,
  deletePost,
} from "../../services/postService";

import { getCategories } from "../../services/categoryService";

const Posts = () => {
  const navigate = useNavigate();

  // Posts
  const [posts, setPosts] = useState([]);

  // Categories
  const [categories, setCategories] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  // Load posts whenever filters or page changes
  useEffect(() => {
    loadPosts();
  }, [page, search, category, status, featured]);

  // Load categories once
  useEffect(() => {
    loadCategories();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);

      const response = await getPosts({
        page,
        limit: 10,
        search,
        category,
        status,
        featured,
      });

      setPosts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load posts."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
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
      setCategoriesLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/posts/${id}/edit`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      await deletePost(id);

      toast.success("Post deleted successfully.");

      // Reload current page so pagination remains accurate
      loadPosts();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete post."
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleFeaturedChange = (event) => {
    setFeatured(event.target.value);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  if (loading && posts.length === 0) {
    return <h2>Loading posts...</h2>;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Posts
        </h1>

        <Link
          to="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Post
        </Link>

      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={handleSearchChange}
            className="border rounded px-3 py-2 w-full"
          />

          {/* Category */}
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border rounded px-3 py-2 w-full"
            disabled={categoriesLoading}
          >
            <option value="">
              All Categories
            </option>

            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">
              All Statuses
            </option>

            <option value="draft">
              Draft
            </option>

            <option value="published">
              Published
            </option>
          </select>

          {/* Featured */}
          <select
            value={featured}
            onChange={handleFeaturedChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">
              All Posts
            </option>

            <option value="true">
              Featured
            </option>

            <option value="false">
              Not Featured
            </option>
          </select>

        </div>

      </div>

      {/* Posts table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="text-left p-4">
                  Title
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Read Time
                </th>

                <th className="text-left p-4">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {posts.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500"
                  >
                    No posts found.
                  </td>
                </tr>

              ) : (

                posts.map((post) => (

                  <tr
                    key={post._id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {post.title}
                    </td>

                    <td className="p-4">
                      {post.category?.name || "Uncategorized"}
                    </td>

                    <td className="p-4 capitalize">
                      {post.status}
                    </td>

                    <td className="p-4">
                      {post.readTime} min
                    </td>

                    <td className="p-4 space-x-2">

                      <button
                        onClick={() =>
                          handleEdit(post._id)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(post._id)
                        }
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

      {/* Pagination */}
      {pagination.totalPages > 1 && (

        <div className="flex justify-between items-center">

          <p className="text-sm text-gray-600">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex gap-2">

            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={handleNextPage}
              disabled={
                page === pagination.totalPages
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Posts;