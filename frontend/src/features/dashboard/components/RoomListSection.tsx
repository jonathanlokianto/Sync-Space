"use client";

import { ROUTES } from "@/constants/routes";
import { Room } from "@/types";
import Link from "next/link";
import { Plus, FolderOpen, Loader2, RotateCw, Home } from "lucide-react";
import { RoomCard } from "./RoomCard";
import { roomAPI } from "@/features/rooms/api/rooms";
import { useQuery } from "@tanstack/react-query";

export default function RoomListSection() {
  const {
    data: roomList,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery<Room[]>({
    queryKey: ["dashboard", "rooms"],
    queryFn: () => roomAPI.fetchRoomByUser(),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading || isRefetching) {
    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[85vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Your List of Rooms
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200/80 p-12 text-center my-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>

          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Loading your rooms...
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
            Please wait while we securely fetch your workspace data.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[85vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Your List of Rooms
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-red-200 p-12 text-center my-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-3">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-medium text-gray-800 mb-1">
            Failed to load rooms
          </h3>
          <p className="text-sm text-red-500 max-w-sm mb-4">
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching your rooms."}
          </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[85vh]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Your List of Rooms
        </h2>
        <Link
          href={ROUTES.CREATE_ROOM}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Room</span>
        </Link>
      </div>

      {(roomList ?? []).length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center my-auto">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-medium text-gray-800 mb-1">
            No Room Yet
          </h3>
          <p className="text-sm text-gray-500 mb-4 max-w-sm">
            Create your first room to start taking notes.
          </p>
          <Link
            href={ROUTES.CREATE_ROOM}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Room</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roomList?.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}