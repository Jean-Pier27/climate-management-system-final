import type { ClimateRecord } from "../models/ClimateRecord";

interface DashboardProps {
  records: ClimateRecord[];
}

export default function Dashboard({ records }: DashboardProps) {
  const totalRecords = records.length;

  const averageTemperature =
    records.length === 0
      ? 0
      : records.reduce((sum, record) => sum + record.temperature, 0) /
        records.length;

  const averageHumidity =
    records.length === 0
      ? 0
      : records.reduce((sum, record) => sum + record.humidity, 0) /
        records.length;

  return (
    <div className="row mb-4">
      <div className="col-md-4 mb-3">
        <div className="card text-white bg-primary shadow">
          <div className="card-body text-center">
            <h5>📋 Total Registros</h5>
            <h2>{totalRecords}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card text-white bg-success shadow">
          <div className="card-body text-center">
            <h5>🌡 Temperatura Promedio</h5>
            <h2>{averageTemperature.toFixed(1)} °C</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card text-white bg-info shadow">
          <div className="card-body text-center">
            <h5>💧 Humedad Promedio</h5>
            <h2>{averageHumidity.toFixed(1)} %</h2>
          </div>
        </div>
      </div>
    </div>
  );
}