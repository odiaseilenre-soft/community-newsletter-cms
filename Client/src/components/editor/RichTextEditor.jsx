import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./MenuBar";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your newsletter...",
}) => {

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Placeholder.configure({
        placeholder,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">

      <MenuBar editor={editor} />

      <EditorContent
        editor={editor}
        className="prose prose-lg max-w-none min-h-[400px] p-6 focus:outline-none"
      />

    </div>
  );
};

export default RichTextEditor;