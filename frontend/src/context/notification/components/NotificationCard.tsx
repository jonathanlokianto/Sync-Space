"use client"

import { useEffect } from "react";
import {
  NotificationItem,
  useNotification,
} from "../context/NotificationContext";

interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: NotificationItem;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  item,
  // className = "",
  // ...props
}) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const duration = item.duration ?? 4000;
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      removeNotification(item.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [item, removeNotification]);

  const defaultVariant = item.variant ?? "error";

  const divBaseStyles =
    "sticky top-0 z-50 max-w-lg mx-auto mt-4 px-4 py-3 rounded shadow-md";

  const divVariantStyles = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
  };

  const closeVariant = {
    error: "text-red-500",
    success: "text-green-500",
    warning: "text-yellow-500",
  };
  return (
    <div
      className={`${divBaseStyles} ${divVariantStyles[defaultVariant]}`}
      role="alert"
    >
      {item.title && (
        <strong className="font-bold block sm:inline mr-2">{item.title}: </strong>
      )}
      {item.message && <span className="block sm:inline">{item.message}</span>}

      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer flex items-center"
        onClick={() => removeNotification(item.id)}
      >
        <svg
          className={`fill-current h-6 w-6 ${closeVariant[defaultVariant]}`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};
