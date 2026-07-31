import { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setInput("");
      return;
    }

    setTags([...tags, value]);
    setInput("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 border rounded-md p-2 min-h-[48px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="font-bold"
            >
              ×
            </button>
          </span>
        ))}

        <input
          className="flex-1 outline-none min-w-[120px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag..."
        />
      </div>
    </div>
  );
};

export default TagInput;