import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../../services/postService";

const PostDetails = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostBySlug(slug);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <h2 className="p-6">Loading...</h2>;
  }

  if (error) {
    return <h2 className="p-6 text-red-600">{error}</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      <div className="text-gray-500 mb-6">
        <span>Category: {post.category?.name}</span>
        <span className="mx-3">•</span>
        <span>{post.readTime} min read</span>
      </div>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="rounded-lg mb-6"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </div>
  );
};

export default PostDetails;