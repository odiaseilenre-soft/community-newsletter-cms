import { useState } from "react";

const CategoryForm = ({
  onSubmit,
  onCancel,
  initialData = {},
}) => {
  const [name, setName] = useState(
    initialData.name || ""
  );

  const [description, setDescription] = useState(
    initialData.description || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          {initialData._id
            ? "Edit Category"
            : "New Category"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block font-medium">
              Name
            </label>

            <input
              type="text"
              className="w-full rounded-lg border p-3"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              className="w-full rounded-lg border p-3"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save
            </button>

          </div>
        </form>

      </div>

    </div>
  );
};

export default CategoryForm;