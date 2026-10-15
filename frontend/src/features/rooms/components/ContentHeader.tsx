"use client";

import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface ContentHeaderProps {
  roomSlug: string;
}

export function ContentHeader({ roomSlug }: ContentHeaderProps) {
  const router = useRouter();
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Room link copied to clipboard!");
  };

  return (
    <header
      className="w-full bg-white flex 
        items-center justify-between 
        px-6 py-4 
        rounded-xl 
        border border-gray-200 
        shadow-sm"
    >
      <div className="flex items-center gap-3">
        <button
          className="text-md font-bold
                text-gray-400 hover:text-gray-600
                border-2 border-gray-200 hover:border-gray-600
                rounded-xl
                px-4
                transition-colors"
          onClick={() => router.push(ROUTES.HOME)}
        >
          &lt;
        </button>
        <h1 className="px-4 text-lg font-semibold text-gray-800">Notepad</h1>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
          ID: {roomSlug}
        </span>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        Share
      </button>
    </header>
  );
}
