import { getRecords } from '../services/climateService'

export default async function ClimateList() {
  const records = await getRecords()

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-dark text-white">
        📋 Registros Climáticos
      </div>

      <div className="card-body table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Ciudad</th>
              <th>Temperatura</th>
              <th>Humedad</th>
              <th>Presión</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>

                <td>📍 {record.city}</td>

                <td>{record.temperature} °C</td>

                <td>{record.humidity} %</td>

                <td>{record.pressure} hPa</td>

                <td>
                  {new Date(record.date).toLocaleString('es-PE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}