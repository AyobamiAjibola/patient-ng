"use client";

import React from "react";
// import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

// type Props = {
//   editor: Editor | null;
//   content?: string;
// };

const Toolbar = ({ editor, content }) => {

    if (!editor) {
        return null;
    }

  return (
    <div
      className="px-4 py-3 flex justify-between items-start
    gap-5 w-full flex-wrap bg-[#05CC7E]"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-[#fff] text-[#05CC7E] p-2 rounded-lg"
              : "text-[#fff] font-bold hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-[#fff] text-white p-2 rounded-lg"
              : "text-[#fff] hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-[#fff] text-white p-2 rounded-lg"
              : "text-[#fff] hover:bg-[#004146] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {/* {content && (
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md"
        >
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;