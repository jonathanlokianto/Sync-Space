"use client";

import { ROUTES } from "@/constants/routes";
import { RoomCreatorProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ContentHeaderProps {
  roomSlug: string;
  roomName: string;
  user?: {
    id: number;
    fullname: string;
    email: string;
    username: string;
  } | null;
}

export function ContentHeader({
  roomSlug,
  roomName,
  user,
}: ContentHeaderProps) {
  const isLoggedIn = Boolean(user);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Room link copied to clipboard!");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(roomSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 py-3.5 rounded-2xl border border-gray-100 shadow-sm transition-all">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all active:scale-95"
          onClick={() => router.push(ROUTES.HOME)}
          title="Back"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          onClick={handleCopyId}
          title={`Code: ${roomSlug} (Click to copy the code!)`}
          className="group relative flex items-center gap-1.5 text-xs font-mono text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer transition-all shadow-2xs"
        >
          <span className="text-gray-400">Code:</span>
          <span className="max-w-27.5 sm:max-w-45 truncate font-medium text-gray-800">
            {roomSlug}
          </span>
          <svg
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>

          {user !== null && (
            <>
              <span className="text-gray-400">Creator:</span>
              <span className="max-w-27.5 sm:max-w-45 truncate font-medium text-gray-800">
                {user?.username}
              </span>
            </>
          )}

          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md animate-fade-in whitespace-nowrap">
              Room Code Copied!
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all active:scale-95"
        >
          <svg
            className="w-3.5 h-3.5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684v0a3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684v0a3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>
      </div>
      {isLoggedIn && (
        <div>
          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all active:scale-95"
            type="button"
            onClick={() => router.push(ROUTES.PROFILE_DETAIL)}
          >
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Profile</span>
          </button>
        </div>
      )}
    </header>
  );
}
