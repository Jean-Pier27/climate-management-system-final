import type { ClimateRecord } from "../models/ClimateRecord";

interface AlertsProps {
  records: ClimateRecord[];
}

interface ClimateAlert {
  message: string;
  type: "danger" | "warning" | "info";
}

export default function Alerts({ records }: AlertsProps) {
  const alerts: ClimateAlert[] = [];

  records.forEach((record) => {
    if (record.temperature >= 40) {
      alerts.push({
        message: `🔥 Temperatura muy alta en ${record.city}: ${record.temperature} °C`,
        type: "danger",
      });
    }

    if (record.temperature <= 10) {
      alerts.push({
        message: `❄ Temperatura muy baja en ${record.city}: ${record.temperature} °C`,
        type: "info",
      });
    }

    if (record.humidity >= 80) {
      alerts.push({
        message: `💧 Humedad elevada en ${record.city}: ${record.humidity}%`,
        type: "warning",
      });
    }
  });

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-dark text-white fw-bold">
        ⚠ Alertas Climáticas
      </div>

      <div className="card-body">
        {alerts.length === 0 ? (
          <div className="alert alert-success mb-0">
            ✅ No existen alertas climáticas.
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`alert alert-${alert.type} mb-2`}
            >
              {alert.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}