import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories } from "../../services/categoryService";
import { createPost } from "../../services/postService";

import RichTextEditor from "../../components/editor/RichTextEditor";
import TagInput from "../../components/TagInput";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("status", status);

      tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      await createPost(formData);

      toast.success("Post created successfully!");

      navigate("/admin/posts");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8">
        Create New Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter post title"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-semibold mb-2">
            Excerpt
          </label>

          <textarea
            rows={3}
            placeholder="Short description..."
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={excerpt}
            onChange={(e) =>
              setExcerpt(e.target.value)
            }
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">
            Category
          </label>

          <select
            className="w-full border rounded-md px-4 py-2"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            required
          >
            <option value="">
              Select Category
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
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold mb-2">
            Status
          </label>

          <select
            className="w-full border rounded-md px-4 py-2"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="draft">
              Draft
            </option>

            <option value="published">
              Published
            </option>
          </select>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block font-semibold mb-2">
            Featured Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFeaturedImage(
                e.target.files[0]
              )
            }
            className="block w-full"
          />

          {featuredImage && (
            <img
              src={URL.createObjectURL(
                featuredImage
              )}
              alt="Preview"
              className="mt-4 h-56 w-full max-w-md object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-2">
            Tags
          </label>

          <TagInput
            tags={tags}
            setTags={setTags}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-2">
            Content
          </label>

          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/posts")}
            className="px-6 py-3 rounded-md border border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;