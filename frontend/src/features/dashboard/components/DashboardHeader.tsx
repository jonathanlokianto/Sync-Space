"use client";

import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/context/notification/context/NotificationContext";
import { session } from "@/lib/session";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// 1. Tambahkan Interface Props
interface DashboardHeaderProps {
  roomName?: string;
}

export default function DashboardHeader({ roomName }: DashboardHeaderProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    session.removeToken();
    showNotification({
      title: "Successful Logout",
      message: "You have been logged out. Redirecting...",
      variant: "success",
    });
    router.push(ROUTES.HOME);
  };

  return (
    <header className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          {roomName && (
            <span className="text-2xl font-bold text-gray-400">
              / <span className="text-blue-600">{roomName}</span>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage and access your saved notes with ease.
        </p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          title="User Menu"
        >
          <User className="w-5 h-5" />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <Link
              href={ROUTES.PROFILE_DETAIL}
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4 text-gray-500" />
              <span>User Profile</span>
            </Link>
            <div className="my-1 border-t border-gray-100" />
            <button
              onClick={() => {
                setIsProfileOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}