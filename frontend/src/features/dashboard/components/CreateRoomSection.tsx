"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useNotification } from "@/context/notification/context/NotificationContext";
import { useCreateRoom } from "@/features/rooms/hooks/useRooms";
import { ROUTES } from "@/constants/routes";

export default function CreateRoomSection() {
  const router = useRouter();
  const { mutate: doCreateRoom, isPending: pendingCreateRoom } =
    useCreateRoom();

  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    content: "",
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doCreateRoom(formData, {
      onSuccess: () => {
        showNotification({
          title: "Created",
          message: "Your room is ready. Sending you there.",
          variant: "success",
        });
        router.push(ROUTES.ROOM_DETAIL(formData.slug));
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: String(error),
          variant: "error",
        });
      },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Create New Room</h1>
            <p className="text-xs text-gray-500">
              Set up a new workspace for your notes and content.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
            >
              Room Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Project Alpha Notes"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Room Slug <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: generateSlug(prev.name),
                  }))
                }
                className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                Regenerate
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-mono text-gray-400 select-none">
                /
              </span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="project-alpha-notes"
                className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5">
              This will be used for your unique room URL.
            </p>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
            >
              Initial Content{" "}
              <span className="text-xs text-gray-400 font-normal lowercase">
                (optional)
              </span>
            </label>
            <textarea
              id="content"
              rows={5}
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Write your initial note or content here..."
              className="w-full p-4 rounded-lg border border-gray-300 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pendingCreateRoom}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              {pendingCreateRoom ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
