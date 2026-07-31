import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaListUl,
  FaListOl,
  FaQuoteRight,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btn = (active = false) =>
    `w-10 h-10 flex items-center justify-center rounded-md transition ${
      active
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-gray-50 p-3">

      {/* Text Style */}

      <button
        type="button"
        className={btn(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FaBold />
      </button>

      <button
        type="button"
        className={btn(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </button>

      <button
        type="button"
        className={btn(editor.isActive("underline"))}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FaUnderline />
      </button>

      <div className="w-px h-8 bg-gray-300"></div>

      {/* Headings */}

      <button
        type="button"
        className={btn(editor.isActive("heading", { level: 1 }))}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        H1
      </button>

      <button
        type="button"
        className={btn(editor.isActive("heading", { level: 2 }))}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H2
      </button>

      <div className="w-px h-8 bg-gray-300"></div>

      {/* Lists */}

      <button
        type="button"
        className={btn(editor.isActive("bulletList"))}
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <FaListUl />
      </button>

      <button
        type="button"
        className={btn(editor.isActive("orderedList"))}
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <FaListOl />
      </button>

      <div className="w-px h-8 bg-gray-300"></div>

      {/* Block Quote */}

      <button
        type="button"
        className={btn(editor.isActive("blockquote"))}
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
      >
        <FaQuoteRight />
      </button>

      <div className="w-px h-8 bg-gray-300"></div>

      {/* Undo / Redo */}

      <button
        type="button"
        className={btn()}
        onClick={() =>
          editor.chain().focus().undo().run()
        }
      >
        <FaUndo />
      </button>

      <button
        type="button"
        className={btn()}
        onClick={() =>
          editor.chain().focus().redo().run()
        }
      >
        <FaRedo />
      </button>

    </div>
  );
};

export default MenuBar;