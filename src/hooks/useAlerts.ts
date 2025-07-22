import { useState } from "react";
import type { AlertType } from "../components/Alert";

export type AlertItem = {
  id: string;
  type: AlertType;
  message: string;
};

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const showAlert = (type: AlertType, message: string) => {
    const id = Date.now().toString();
    const newAlert: AlertItem = { id, type, message };

    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return {
    alerts,
    showAlert,
    removeAlert,
    clearAlerts,
  };
};
