import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

import { getCategories } from "../../services/categoryService";
import { getPosts } from "../../services/postService";
import { API_BASE_URL } from "../../services/api";

const CategoryPosts = () => {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategoryPosts();
  }, [slug]);

  const fetchCategoryPosts = async () => {
    try {
      setLoading(true);
      setError("");

      // Get categories
      const categoryResponse = await getCategories({
        limit: 100,
      });

      const categories = categoryResponse.data;

      // Find category using slug
      const foundCategory = categories.find(
        (item) => item.slug === slug
      );

      if (!foundCategory) {
        setError("Category not found.");
        return;
      }

      setCategory(foundCategory);

      // Get published posts for this category
      const postsResponse = await getPosts({
        category: foundCategory._id,
        status: "published",
        limit: 100,
      });

      setPosts(postsResponse.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load category posts."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <h2 className="text-2xl font-semibold">
          Loading category...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">
          {error}
        </h2>

        <Link
          to="/"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Category Header */}
      <section className="bg-blue-700 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-4 text-lg max-w-3xl">
              {category.description}
            </p>
          )}

        </div>

      </section>

      {/* Posts */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            {category.name} Posts
          </h2>

          <span className="text-gray-500">
            {posts.length}{" "}
            {posts.length === 1 ? "post" : "posts"}
          </span>

        </div>

        {posts.length === 0 ? (

          <div className="bg-white rounded-lg shadow p-10 text-center">

            <p className="text-gray-500 text-lg">
              No published posts in this category yet.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {posts.map((post) => (

              <article
                key={post._id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition"
              >

                {post.featuredImage ? (
                  <img
                    src={`${API_BASE_URL}${post.featuredImage}`}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-6">

                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">
                    {category.name}
                  </span>

                  <h3 className="text-xl font-bold">

                    <Link
                      to={`/posts/${post.slug}`}
                      className="hover:text-blue-600"
                    >
                      {post.title}
                    </Link>

                  </h3>

                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between mt-6 text-sm text-gray-500">

                    <span>
                      {post.readTime} min read
                    </span>

                    <span>
                      {post.publishedAt &&
                        format(
                          new Date(post.publishedAt),
                          "MMM dd, yyyy"
                        )}
                    </span>

                  </div>

                  <Link
                    to={`/posts/${post.slug}`}
                    className="inline-block mt-5 text-blue-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default CategoryPosts;