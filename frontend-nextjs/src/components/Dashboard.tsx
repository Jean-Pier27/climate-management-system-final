import type { ClimateRecord } from "../models/ClimateRecord";

interface DashboardProps {
  records: ClimateRecord[];
}

export default function Dashboard({ records }: DashboardProps) {

  const total = records.length;

  const avgTemp =
    total === 0
      ? 0
      : records.reduce((sum, r) => sum + r.temperature, 0) / total;

  const avgHumidity =
    total === 0
      ? 0
      : records.reduce((sum, r) => sum + r.humidity, 0) / total;

  return (
    <div className="row mb-4">

      <div className="col-md-4">

        <div className="card bg-primary text-white">

          <div className="card-body text-center">

            <h5>Total Registros</h5>

            <h2>{total}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card bg-success text-white">

          <div className="card-body text-center">

            <h5>Temperatura Promedio</h5>

            <h2>{avgTemp.toFixed(1)} °C</h2>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card bg-info text-white">

          <div className="card-body text-center">

            <h5>Humedad Promedio</h5>

            <h2>{avgHumidity.toFixed(1)}%</h2>

          </div>

        </div>

      </div>

    </div>
  );

}