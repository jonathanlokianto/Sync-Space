"use client";

import { useNotification } from "@/context/notification/context/NotificationContext";
import { useEffect, useState } from "react";
import { myProfileAPI } from "../api/profile";
import { useGetMyProfile, useUpdateMyProfile } from "../hooks/useProfile";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import {
  User,
  Mail,
  AtSign,
  Lock,
  ArrowLeft,
  Save,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export function ProfileSection() {
  const { mutate: doUpdateMyProfile, isPending } = useUpdateMyProfile();

  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const { showNotification } = useNotification();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await myProfileAPI.getMyProfile();
        setFormData({
          id: String(data.id),
          fullname: data.fullname || "",
          email: data.email || "",
          username: data.username || "",
          password: "",
        });
      } catch (error) {
        showNotification({
          title: "Error",
          message: String(error),
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
  }, [showNotification]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    await doUpdateMyProfile(formData, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Your profile has been updated!",
          variant: "success",
        });
        // Kosongkan kembali field password setelah sukses update
        setFormData((prev) => ({ ...prev, password: "" }));
      },
      onError: () => {
        showNotification({
          title: "Error",
          message:
            "There is an error when updating your profile. Please try again.",
          variant: "error",
        });
      },
    });
  };

  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (deleteCountdown == null || deleteCountdown <= 0) return;

    const timer = setTimeout(() => {
      setDeleteCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [deleteCountdown]);

  const handleDeleteMyProfile = async () => {
    if (deleteCountdown === null) {
      setDeleteCountdown(5);
      showNotification({
        title: "Warning",
        message: "You are about to delete your account. Are you sure?",
        variant: "warning",
      });
    } else {
      try {
        await myProfileAPI.deleteMyProfile();
        showNotification({
          title: "Notice",
          message: "Your profile has been deleted",
          variant: "error",
        });
        router.push(ROUTES.HOME);
      } catch (error) {
        showNotification({
          title: "Error",
          message: String(error),
          variant: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 gap-3 min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Return Navigation */}
      <div className="mb-6">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          href={ROUTES.HOME}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex items-start justify-between pb-6 border-b border-gray-100 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your personal information and security credentials.
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100">
            ID: {formData.id}
          </span>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleProfileUpdate} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleProfileChange}
              required
              placeholder="e.g. John Doe"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleProfileChange}
              required
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            Username{" "}
            <span className="text-gray-400 font-normal lowercase">
              (5-20 characters)
            </span>
          </label>
          <div className="relative flex items-center">
            <AtSign className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleProfileChange}
              minLength={5}
              maxLength={20}
              required
              placeholder="johndoe"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            New Password{" "}
            <span className="text-gray-400 font-normal lowercase">
              (optional)
            </span>
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleProfileChange}
              placeholder="Leave blank to keep current password"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1.5">
            Only fill this out if you wish to change your existing password.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 shadow-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Profile</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDeleteMyProfile}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all shadow-sm ${
              deleteCountdown !== null
                ? "bg-red-700 animate-pulse ring-4 ring-red-200"
                : "bg-red-600 hover:bg-red-700 active:bg-red-800"
            }`}
          >
            {deleteCountdown !== null ? (
              <>
                <AlertTriangle className="w-4 h-4" />
                <span>Confirm Delete ({deleteCountdown}s)</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
