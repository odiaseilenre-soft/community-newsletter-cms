import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getPosts } from "../../services/postService";
import { API_BASE_URL } from "../../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts({
         status: "published",
      });

      setPosts(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load posts."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">
          Loading posts...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-red-600 text-xl">
          {error}
        </h2>
      </div>
    );
  }

  // Only show published posts
 const publishedPosts = posts;

const featuredPosts = publishedPosts.filter(
  (post) => post.isFeatured
);

const latestPosts = publishedPosts.filter(
  (post) => !post.isFeatured
);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            Community Newsletter
          </h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Stay informed with the latest community news,
            events, announcements, and inspiring stories.
          </p>

          <a
            href="#latest-posts"
            className="inline-block mt-10 bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Read Latest News
          </a>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Featured Posts */}

        {featuredPosts.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8">
              ⭐ Featured Posts
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">

              {featuredPosts.map((post) => (

                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >

                  {post.featuredImage ? (
                    <img
                       src={`${API_BASE_URL}${post.featuredImage}`}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}

                  <div className="p-6">

                    <span className="inline-block bg-yellow-500 text-white text-xs px-3 py-1 rounded-full mb-4">
                      FEATURED
                    </span>

                    <h3 className="text-2xl font-bold">

                      <Link
                        to={`/posts/${post.slug}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>

                    </h3>

                    <p className="text-gray-600 mt-4">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex justify-between text-sm text-gray-500">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {post.category?.name}
                      </span>

                      <span>
                        {post.publishedAt &&
                          format(
                            new Date(post.publishedAt),
                            "MMM dd, yyyy"
                          )}
                      </span>

                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                      {post.readTime} min read
                    </div>

                  </div>

                </div>

              ))}

            </div>
          </>
        )}

        {/* Latest Posts */}

        <h2
          id="latest-posts"
          className="text-3xl font-bold mb-8"
        >
          Latest Posts
        </h2>

        {latestPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No published posts yet.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {latestPosts.map((post) => (

              <div
                key={post._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >

                {post.featuredImage ? (
                  <img
                     src={`${API_BASE_URL}${post.featuredImage}`}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="h-52 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="p-6">

                  <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mb-3">
                    {post.category?.name || "General"}
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
                    className="inline-block mt-6 text-blue-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Home;