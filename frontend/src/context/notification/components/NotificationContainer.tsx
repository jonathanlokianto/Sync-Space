"use client"

import React from "react";

import { NotificationCard } from "./NotificationCard";
import { useNotification } from "../context/NotificationContext";

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();
  return (
    <div className="fixed top-4 right-4 left-4 z-50 pointer-events-none space-y-2">
      <div className="pointer-events-auto">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
