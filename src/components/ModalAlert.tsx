import { useEffect } from "react";
import type { AlertType } from "../components/Alert";

type ModalAlertProps = {
  type: AlertType;
  message: string;
  isVisible: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
  confirmText?: string;
  cancelText?: string;
};

export default function ModalAlert({
  type,
  message,
  isVisible,
  onConfirm,
  onCancel,
  onClose,
  autoClose = true,
  duration = 3000,
  confirmText = "OK",
  cancelText = "Batal",
}: ModalAlertProps) {
  useEffect(() => {
    if (isVisible && autoClose && !onConfirm && !onCancel) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose, onConfirm, onCancel]);

  if (!isVisible) return null;

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      case "info":
        return "alert-info";
      default:
        return "alert-info";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div role="alert" className={`alert ${getAlertClass()} mb-4`}>
          {getIcon()}
          <div className="flex-1">
            <span>{message}</span>
          </div>
        </div>

        <div className="modal-action">
          {onConfirm || onCancel ? (
            <div className="flex gap-2 justify-end w-full">
              {onCancel && (
                <button className="btn btn-sm" onClick={handleCancel}>
                  {cancelText}
                </button>
              )}
              {onConfirm && (
                <>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleConfirm}
                  >
                    {confirmText}
                  </button>
                  <button className="btn btn-sm" onClick={handleCancel}>
                    {cancelText}
                  </button>
                </>
              )}
            </div>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={onClose}>
              Tutup
            </button>
          )}
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
