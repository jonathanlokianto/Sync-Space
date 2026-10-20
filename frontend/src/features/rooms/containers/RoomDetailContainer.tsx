"use client";

import { useQuery } from "@tanstack/react-query";
import { roomAPI } from "../api/rooms";
import { ContentHeader } from "../components/ContentHeader";
import { ContentForm } from "../components/ContentForm";

interface RoomDetailProps {
  roomSlug: string;
}

export function RoomDetailContainer({ roomSlug }: RoomDetailProps) {
  const {
    data: room,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", roomSlug],
    queryFn: () => roomAPI.fetchRoomBySlug(roomSlug),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p className="text-center mt-10">Loading room...</p>;

  if (error || !room)
    return <p className="text-center mt-10 text-red-500">Room not found.</p>;

  const user = room.user ?? null;
  return (
    <section className="flex flex-col flex-1 w-full h-full p-4 md:p-6 gap-4 max-w-6xl mx-auto">
      <ContentHeader roomSlug={roomSlug} roomName={room.name} user={user} />
      <ContentForm key={room.id} room={{ ...room }} />
    </section>
  );
}
