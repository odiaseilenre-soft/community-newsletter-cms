import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaNewspaper,
  FaFolderOpen,
  FaCheckCircle,
  FaRegEdit,
} from "react-icons/fa";

import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();

        setStats(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-red-600">
        {error}
      </h2>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FaNewspaper />}
          color="bg-blue-600"
        />

        <StatCard
          title="Published"
          value={stats.publishedPosts}
          icon={<FaCheckCircle />}
          color="bg-green-600"
        />

        <StatCard
          title="Drafts"
          value={stats.draftPosts}
          icon={<FaRegEdit />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon={<FaFolderOpen />}
          color="bg-purple-600"
        />

      </div>

      <div className="bg-white rounded-lg shadow">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-xl font-semibold">
            Recent Posts
          </h2>

          <Link
            to="/admin/posts"
            className="text-blue-600"
          >
            View All
          </Link>

        </div>

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

            </tr>

          </thead>

          <tbody>

            {stats.recentPosts.map((post) => (
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
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => (
  <div className="bg-white rounded-lg shadow p-6">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-gray-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`${color} text-white p-4 rounded-full text-xl`}
      >
        {icon}
      </div>

    </div>

  </div>
);

export default Dashboard;