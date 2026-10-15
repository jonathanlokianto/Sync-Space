"use client";

import { useState } from "react";

export function ContentForm() {
  const [content, setContent] = useState({
    content: "",
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentUpdate = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Data yang di-update:", content);
  };

  return (
    <form
      onSubmit={handleContentUpdate}
      className="bg-white w-full flex-1 flex flex-col rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="flex-1 flex flex-col p-2">
        <textarea
          name="content"
          value={content.content}
          onChange={handleContentChange}
          className="w-full h-full flex-1 resize-none p-4 text-gray-800 placeholder-gray-400 font-mono text-sm leading-relaxed focus:outline-none border-none"
          placeholder="Write your note here..."
        />
      </div>

      {/* Bar Bawah Sticky untuk Tombol Update */}
      <div className="sticky bottom-0 bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-mono">
          Words:{" "}
          {content.content.trim()
            ? content.content.trim().split(/\s+/).length
            : 0}
        </span>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
        >
          Update
        </button>
      </div>
    </form>
  );
}
