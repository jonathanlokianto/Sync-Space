"use client";

import { ROUTES } from "@/constants/routes";
import { useCreateRoom } from "@/features/rooms/hooks/useRooms";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function HomePage() {
  const queryClient = useQueryClient();
  // const [roomSlug, setRoomId] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
  });
  const router = useRouter();
  const {
    mutate: doCreateRoom,
    error: errorCreateRoom,
    isPending: isCreatingRoom,
  } = useCreateRoom();

  const activeError = errorCreateRoom;
  const activePending = isCreatingRoom;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoinRoom = (e: React.SubmitEvent) => {
    e.preventDefault();
    const identity = formData.slug.trim();
    if (!identity) return;

    router.push(ROUTES.ROOM_DETAIL(identity));
  };

  const handleCreateRandomRoom = () => {
    // const randomSlug = Math.random().toString(36).substring(2, 8);
    doCreateRoom(undefined, {
      onSuccess: (response) => {
        const identity = response.slug;
        queryClient.setQueryData(["room", identity], response);
        router.push(ROUTES.ROOM_DETAIL(identity));
        // router.push(`/rooms/${roomSlug}`);
      },
      onError: (error) => {
        console.error("Failed to generate a room for you. Error: ", error);
      },
    });
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sync Space</h1>
      <p className="text-sm text-gray-500 mb-6">
        Instantly share notes and files between devices via a unique ID Path.
      </p>

      <form onSubmit={handleJoinRoom} className="space-y-3">
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Enter ID Path"
          className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {activeError && (
          <p className="text-red-500 text-sm font-medium">
            Failed to open a room for you.
          </p>
        )}

        <button
          type="submit"
          disabled={activePending}
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Open Room
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">OR</span>
        </div>
      </div>

      <button
        onClick={handleCreateRandomRoom}
        disabled={activePending}
        className="w-full bg-gray-100 text-gray-700 font-medium py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-colors"
      >
        Create Random Room
      </button>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full my-6">
        <Link
          href={ROUTES.LOGIN}
          className="w-50% text-blue-800 font-medium hover:text-blue-400 transition-colors"
        >
          Login
        </Link>

        <span className="flex-none text-gray-600">or</span>

        <Link
          href={ROUTES.REGISTER}
          className="w-50% text-blue-800 font-medium hover:text-blue-400 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
