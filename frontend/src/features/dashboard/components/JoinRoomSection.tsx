"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export function JoinRoomSection() {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const identity = roomCode.trim();
    if (!identity) return;

    router.push(ROUTES.ROOM_DETAIL(identity));
  };

  const isInvalid = !roomCode.trim();

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <form
        onSubmit={handleJoinRoom}
        className="flex items-center gap-3 w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
      >
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter Room Code to join instantly..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={isInvalid}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        >
          <LogIn className="w-4 h-4" />
          <span>Join Room</span>
        </button>
      </form>
    </div>
  );
}