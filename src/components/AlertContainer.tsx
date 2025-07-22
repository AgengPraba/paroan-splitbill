import Alert from "./Alert";
import type { AlertItem } from "../hooks/useAlerts";

type Props = {
  alerts: AlertItem[];
  onRemoveAlert: (id: string) => void;
};

export default function AlertContainer({ alerts, onRemoveAlert }: Props) {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => onRemoveAlert(alert.id)}
          autoClose={true}
          duration={5000}
        />
      ))}
    </div>
  );
}
