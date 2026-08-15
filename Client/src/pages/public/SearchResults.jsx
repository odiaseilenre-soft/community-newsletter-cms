import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { API_BASE_URL } from "../../services/api";

import { getPosts } from "../../services/postService";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    searchPosts();
  }, [searchTerm]);

  const searchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPosts({
        search: searchTerm,
        status: "published",
        limit: 10,
      });

      setPosts(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to search posts."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          Searching...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <section className="bg-blue-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold">
            Search Results
          </h1>

          <p className="mt-3 text-lg">
            Results for:{" "}
            <span className="font-semibold">
              "{searchTerm}"
            </span>
          </p>

        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">

        {posts.length === 0 ? (

          <div className="bg-white rounded-lg shadow p-10 text-center">

            <p className="text-gray-500 text-lg">
              No published posts found.
            </p>

            <Link
              to="/"
              className="inline-block mt-5 text-blue-600 font-semibold hover:underline"
            >
              ← Back to Home
            </Link>

          </div>

        ) : (

          <>
            <p className="text-gray-600 mb-8">
              {posts.length}{" "}
              {posts.length === 1 ? "result" : "results"} found
            </p>

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
                      {post.category?.name || "General"}
                    </span>

                    <h2 className="text-xl font-bold">
                      <Link
                        to={`/posts/${post.slug}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>

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
          </>

        )}

      </main>

    </div>
  );
};

export default SearchResults;