"use client"

import { createContext, ReactNode, useCallback, useContext, useState } from "react";

export interface NotificationItem {
  id: number;
  title?: string;
  message?: string;
  variant?: "error" | "success" | "warning";
  duration?: number;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  showNotification: (notif: Omit<NotificationItem, "id">) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);


export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within NotificationProvider",
    );
  }
  return context;
};


export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const showNotification = useCallback(
    (notif: Omit<NotificationItem, "id">) => {
      const newNotif = { ...notif, id: Date.now() };
      setNotifications((prev) => [...prev, newNotif]);
    }, []);

    const removeNotification = useCallback((id: number) => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, []);

    return (
      <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
        {children}
      </NotificationContext.Provider>
    );
};
