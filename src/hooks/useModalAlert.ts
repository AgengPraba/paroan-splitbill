import { useState } from "react";
import type { AlertType } from "../components/Alert";

export type ModalAlertOptions = {
  type: AlertType;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  autoClose?: boolean;
  duration?: number;
};

export const useModalAlert = () => {
  const [alertConfig, setAlertConfig] = useState<ModalAlertOptions | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (options: ModalAlertOptions) => {
    setAlertConfig(options);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
    setTimeout(() => setAlertConfig(null), 300); // delay untuk animasi
  };

  // Shorthand methods
  const showSuccess = (
    message: string,
    options?: Partial<ModalAlertOptions>
  ) => {
    showAlert({ type: "success", message, ...options });
  };

  const showError = (message: string, options?: Partial<ModalAlertOptions>) => {
    showAlert({ type: "error", message, ...options });
  };

  const showWarning = (
    message: string,
    options?: Partial<ModalAlertOptions>
  ) => {
    showAlert({ type: "warning", message, ...options });
  };

  const showInfo = (message: string, options?: Partial<ModalAlertOptions>) => {
    showAlert({ type: "info", message, ...options });
  };

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showAlert({
      type: "warning",
      message,
      onConfirm,
      onCancel,
      confirmText: "Ya",
      cancelText: "Tidak",
      autoClose: false,
    });
  };

  return {
    alertConfig,
    isVisible,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
  };
};
