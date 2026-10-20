import { Room } from "@/types";
import { Check, Copy, ExternalLink, FileText, Trash2 } from "lucide-react";
import { useDeleteRoom } from "@/features/rooms/hooks/useRooms";
import { useNotification } from "@/context/notification/context/NotificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const {
    mutate: doDeleteRoom,
    error: errorDeleteRoom,
    isPending,
  } = useDeleteRoom();

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/room/${room.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    showNotification({
      title: "Copied Successfully",
      message: "Room link has been copied to clipboard.",
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteRoom = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete room "${name}"?`)) {
      doDeleteRoom(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["dashboard", "rooms"] });
          showNotification({
            title: "Success",
            message: `Room "${name}" has been deleted.`,
            variant: "success",
          });
        },
        onError: (error) => {
          showNotification({
            title: "Error",
            message: String(error),
            variant: "error",
          });
        },
      });
    }
  };

  const snippet = room.content
    ? room.content.length > 90
      ? room.content.substring(0, 90) + "..."
      : room.content
    : "No content in this room yet...";

  return (
    <div
      key={room.id}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {room.name}
          </h3>
          <span className="text-[11px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 shrink-0">
            ID: {room.id}
          </span>
        </div>

        <p className="text-xs text-gray-400 font-mono mb-3 truncate">
          /{room.slug}
        </p>

        <div className="flex items-start gap-2 text-gray-600 text-sm bg-gray-50/70 p-3 rounded-lg border border-gray-100 flex-1">
          <FileText className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
            {snippet}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
          title="Copy Room Link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleDeleteRoom(room.id, room.name)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete Room"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Link
            href={ROUTES.ROOM_DETAIL(room.slug)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>Open</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
