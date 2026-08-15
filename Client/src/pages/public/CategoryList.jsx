import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../../services/categoryService";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories({
        limit: 100,
        active: "true",
      });

      setCategories(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <h2 className="text-2xl font-semibold">
          Loading categories...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Header */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            Categories
          </h1>

          <p className="mt-4 text-lg">
            Explore community news and stories by category.
          </p>

        </div>
      </section>

      {/* Categories */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-10 text-center">
            <p className="text-gray-500 text-lg">
              No categories available.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="bg-white rounded-xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition"
              >

                <h2 className="text-2xl font-bold text-gray-800">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {category.description}
                  </p>
                )}

                <span className="inline-block mt-6 text-blue-600 font-semibold">
                  View Posts →
                </span>

              </Link>
            ))}

          </div>
        )}

      </main>

    </div>
  );
};

export default CategoryList;