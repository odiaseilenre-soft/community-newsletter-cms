import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/postService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");

        const response = await getPosts();

        console.log("API Response:", response);

        setPosts(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);

        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load posts."
        );
      } finally {
        console.log("Finished loading.");

        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading posts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Community Newsletter
      </h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg p-4 mb-4"
          >
            <h2 className="text-xl font-semibold">
              <Link
                to={`/posts/${post.slug}`}
                className="hover:text-blue-600"
              >
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600 mt-2">
              {post.excerpt}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Category: {post.category?.name || "Uncategorized"}
            </p>

            <p className="text-sm text-gray-500">
              Read Time: {post.readTime} min
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;