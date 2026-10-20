"use client";

import { useState } from "react";
import { useUpdateRoom } from "../hooks/useRooms";
import { useNotification } from "@/context/notification/context/NotificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { Room } from "@/types";

interface ContentFormProps {
  room: Room;
}

export function ContentForm({ room }: ContentFormProps) {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const handleNotificationSuccess = ({
    title,
    message,
  }: {
    title?: string;
    message?: string;
  }) => {
    showNotification({
      title: title,
      message: message,
      variant: "success",
    });
  };

  const handleNotificationError = ({
    title,
    message,
  }: {
    title?: string;
    message?: string;
  }) => {
    showNotification({
      title: title,
      message: message,
      variant: "error",
    });
  };

  const [formData, setFormData] = useState({
    id: room.id,
    name: room.name,
    slug: room.slug,
    content: room.content || "",
  });

  const {
    mutate: doUpdateRoom,
    error: errorUpdateRoom,
    isPending: pendingUpdateRoom,
  } = useUpdateRoom();

  const activeError = errorUpdateRoom;
  const activePending = pendingUpdateRoom;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await doUpdateRoom(formData, {
      onSuccess: () => {
        // alert("Room Successfully Updated!");
        handleNotificationSuccess({
          title: "Success",
          message: "Room Updated Successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["room", room.slug] });
      },
      onError: () => {
        // alert("Update Failed");
        handleNotificationError({
          title: "Error",
          message: "Failure in updating your room.",
        });
      },
    });
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
          value={formData.content}
          onChange={handleContentChange}
          className="w-full h-full flex-1 resize-none p-4 text-gray-800 placeholder-gray-400 font-mono text-sm leading-relaxed focus:outline-none border-none"
          placeholder="Write your note here..."
        />
      </div>

      <div className="sticky bottom-0 bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-mono">
          Words:{" "}
          {formData.content.trim()
            ? formData.content.trim().split(/\s+/).length
            : 0}
        </span>

        <button
          type="submit"
          disabled={activePending}
          className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
        >
          Update
        </button>
      </div>
    </form>
  );
}
