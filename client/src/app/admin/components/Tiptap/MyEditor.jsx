"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ onChange, content }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit, 
      Underline
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start items-start w-full gap-3 text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none h-[220px]",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full h-[300px] border border-gray-300 rounded-bl-md rounded-br-md">
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{ whiteSpace: "pre-line", overflow: 'scroll' }} editor={editor} />
    </div>
  );
};

export default Tiptap;