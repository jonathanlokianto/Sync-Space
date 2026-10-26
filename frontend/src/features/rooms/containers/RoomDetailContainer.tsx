"use client";

import { useQuery } from "@tanstack/react-query";
import { roomAPI } from "../api/rooms";
import { ContentHeader } from "../components/ContentHeader";
import { ContentForm } from "../components/ContentForm";
import { FolderOpen, Home, Loader2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import axios from "axios";

interface RoomDetailProps {
  roomSlug: string;
}

export function RoomDetailContainer({ roomSlug }: RoomDetailProps) {
  const {
    data: room,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["room", roomSlug],
    queryFn: () => roomAPI.fetchRoomBySlug(roomSlug),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-12 text-center my-auto shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Loading your room...
        </h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  if (error || !room) {
    const isNotFound =
      (axios.isAxiosError(error) && error.response?.status === 404) ||
      error?.message?.toLowerCase().includes("not found") ||
      error?.message?.toLowerCase().includes("does not exist");
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-12 text-center my-auto shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-3">
          <FolderOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-medium text-gray-800 mb-1">
          {isNotFound ? "Room does not exist." : "Failed to load your room."}
        </h3>
        <p className="text-sm text-red-500 max-w-sm mb-4">
          {isNotFound
            ? "The room you are looking for might have been deleted or the ID Path is incorrect."
            : error instanceof Error
              ? error.message
              : "Something went wrong while fetching the room."}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const user = room?.user ?? null;
  return (
    <section className="flex flex-col flex-1 w-full h-full p-4 md:p-6 gap-4 max-w-6xl mx-auto">
      <ContentHeader roomSlug={roomSlug} roomName={room.name} user={user} />
      <ContentForm key={room.id} room={{ ...room }} />
    </section>
  );
}
