"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;
  const [message, setMessages] = useState<string>("Loading ...");
  useEffect(() => {
    if (!roomId) return;

    fetch(`${baseUrl}/api/rooms/${roomId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.text();
      })
      .then((data) => setMessages(data))
      .catch(() => setMessages("Failed to connect to the Go backend"));
  }, [roomId]);

  return (
    <main className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Shared Room: {roomId}</h1>

      <div className="p-4 bg-gray-100 rounded border">
        <p className="text-sm text-gray-600">Response from Backend Go:</p>
        <p className="font-mono text-blue-600 mt-2">{message}</p>
      </div>
    </main>
  );
}