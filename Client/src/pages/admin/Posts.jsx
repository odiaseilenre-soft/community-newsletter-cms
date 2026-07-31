import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPosts } from "../../services/postService";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await getPosts();

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading posts...</h2>;
  }

  return (
    <div className="space-y-6">

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

      <div className="bg-white rounded-lg shadow overflow-hidden">

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

            {posts.map((post) => (

              <tr
                key={post._id}
                className="border-t"
              >

                <td className="p-4">
                  {post.title}
                </td>

                <td className="p-4">
                  {post.category?.name}
                </td>

                <td className="p-4 capitalize">
                  {post.status}
                </td>

                <td className="p-4">
                  {post.readTime} min
                </td>

                <td className="p-4 space-x-2">

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Posts;