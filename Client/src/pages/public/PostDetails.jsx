import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { getPostBySlug } from "../../services/postService";
import { API_BASE_URL } from "../../services/api";

const PostDetails = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await getPostBySlug(slug);

      setPost(response.data.post);
      setRelatedPosts(response.data.relatedPosts);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load article."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading article...
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

      {/* Featured Image */}

      {post.featuredImage && (
        <img
          src={`${API_BASE_URL}${post.featuredImage}`}
          alt={post.title}
          className="w-full h-[450px] object-cover"
        />
      )}

      <div className="max-w-4xl mx-auto bg-white -mt-20 relative rounded-xl shadow-lg p-10">

        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {post.category?.name}
        </span>

        <h1 className="text-5xl font-bold mt-5 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-6 mt-6 text-gray-500 text-sm">

          <span>
            By{" "}
            <strong>
              {post.author
                ? `${post.author.firstName} ${post.author.lastName}`
                : "Unknown Author"}
            </strong>
          </span>

          <span>
            {post.publishedAt &&
              format(
                new Date(post.publishedAt),
                "MMMM dd, yyyy"
              )}
          </span>

          <span>{post.readTime} min read</span>

          <span>{post.views} views</span>

        </div>

        <hr className="my-8" />

        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />

        {post.tags?.length > 0 && (
          <>
            <hr className="my-10" />

            <div className="flex flex-wrap gap-3">

              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}

            </div>
          </>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto py-16 px-6">

          <h2 className="text-3xl font-bold mb-8">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {relatedPosts.map((related) => (

              <div
                key={related._id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition"
              >

                {related.featuredImage && (
                  <img
                    src={`${API_BASE_URL}${related.featuredImage}`}
                    alt={related.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5">

                  <h3 className="font-bold text-lg">

                    <Link
                      to={`/posts/${related.slug}`}
                      className="hover:text-blue-600"
                    >
                      {related.title}
                    </Link>

                  </h3>

                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {related.excerpt}
                  </p>

                  <div className="mt-5 flex justify-between text-sm text-gray-500">

                    <span>
                      {related.readTime} min
                    </span>

                    <span>
                      {related.publishedAt &&
                        format(
                          new Date(
                            related.publishedAt
                          ),
                          "MMM dd, yyyy"
                        )}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>
      )}

    </div>
  );
};

export default PostDetails;