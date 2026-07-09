import type { ClimateRecord } from "../models/ClimateRecord";

interface PublicAlertsProps {
  records: ClimateRecord[];
}

export default function PublicAlerts({ records }: PublicAlertsProps) {
  const alerts = records.flatMap((record) => {
    const result = [];

    if (record.temperature >= 40) {
      result.push({
        id: `${record.id}-temp-high`,
        message: `🔥 Temperatura muy alta en ${record.city}: ${record.temperature} °C`,
        type: "danger",
      });
    }

    if (record.temperature <= 10) {
      result.push({
        id: `${record.id}-temp-low`,
        message: `❄ Temperatura muy baja en ${record.city}: ${record.temperature} °C`,
        type: "info",
      });
    }

    if (record.humidity >= 80) {
      result.push({
        id: `${record.id}-humidity-high`,
        message: `💧 Humedad elevada en ${record.city}: ${record.humidity}%`,
        type: "warning",
      });
    }

    return result;
  });

  const criticalAlerts = alerts.filter((alert) => alert.type === "danger").length;
  const moderateAlerts = alerts.filter((alert) => alert.type === "warning").length;

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-dark text-white fw-bold">
        ⚠ Estado Climático General
      </div>

      <div className="card-body">
        <p>
          🔴 Alertas críticas: <strong>{criticalAlerts}</strong>
        </p>

        <p>
          🟡 Alertas moderadas: <strong>{moderateAlerts}</strong>
        </p>

        {alerts.length === 0 ? (
          <div className="alert alert-success mb-0">
            ✅ No existen alertas climáticas activas.
          </div>
        ) : (
          alerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.type} mb-2`}>
              {alert.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}