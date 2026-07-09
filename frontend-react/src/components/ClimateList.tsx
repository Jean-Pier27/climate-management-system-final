import { useEffect, useState } from "react";
import type { ClimateRecord } from "../models/ClimateRecord";
import { getRecords } from "../services/climateService";
import Dashboard from "./Dashboard";
import ClimateForm from "./ClimateForm";
import { createRecord } from "../services/climateService";
import { deleteRecord } from "../services/climateService";
import { updateRecord } from "../services/climateService";
import Alerts from "./Alerts";

export default function ClimateList() {

  const [records, setRecords] = useState<ClimateRecord[]>([]);

  const [selectedRecord, setSelectedRecord] = useState<ClimateRecord | null>(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const data = await getRecords();
console.log('DATOS RECIBIDOS EN REACT:', data);
setRecords(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreate(record: Omit<ClimateRecord, "id">) {
  try {
    await createRecord(record);
    await loadRecords();
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(id: number) {
  const confirmDelete = confirm("¿Seguro que deseas eliminar este registro?");

  if (!confirmDelete) return;

  try {
    await deleteRecord(id);
    await loadRecords();
  } catch (error) {
    console.error(error);
  }
}

function handleEdit(record: ClimateRecord) {
  setSelectedRecord(record);
}

async function handleUpdate(record: Omit<ClimateRecord, "id">) {
  if (!selectedRecord) return;

  try {
    await updateRecord(selectedRecord.id, record);
    setSelectedRecord(null);
    await loadRecords();
  } catch (error) {
    console.error(error);
  }
}

const filteredRecords = records.filter((record) =>
  record.city.toLowerCase().includes(searchText.toLowerCase())
);

function getTemperatureBadge(temp: number) {
  if (temp >= 40) return "bg-danger";
  if (temp >= 30) return "bg-warning text-dark";
  return "bg-success";
}

function getHumidityBadge(humidity: number) {
  if (humidity >= 80) return "bg-danger";
  if (humidity >= 60) return "bg-warning text-dark";
  return "bg-primary";
}
  return (
    <div className="container">

        <Dashboard records={records} />

        <Alerts records={records} />

      <h2>Registros Climáticos</h2>

      <ClimateForm
       onCreate={handleCreate}
       onUpdate={handleUpdate}
       selectedRecord={selectedRecord}
        />

        <input
         type="text"
         className="form-control mb-3"
         placeholder="🔍 Buscar ciudad..."
         value={searchText}
         onChange={(e) => setSearchText(e.target.value)}
          />

      <table className="table table-striped">

        <thead>

          <tr>

            <th>ID</th>
            <th>Ciudad</th>
            <th>Temperatura</th>
            <th>Humedad</th>
            <th>Presión</th>
            <th>Fecha</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>
  {filteredRecords.length === 0 ? (
    <tr>
      <td colSpan={7} className="text-center text-muted py-4">
        📭 No existen registros climáticos para mostrar.
      </td>
    </tr>
  ) : (
    filteredRecords.map((record) => (
      <tr key={record.id}>
        <td>{record.id}</td>

        <td className="fw-bold">
          📍 {record.city}
        </td>

        <td>
          <span className={`badge ${getTemperatureBadge(record.temperature)}`}>
            {record.temperature} °C
          </span>
        </td>

        <td>
          <span className={`badge ${getHumidityBadge(record.humidity)}`}>
            {record.humidity} %
          </span>
        </td>

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

        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(record)}
          >
            ✏️ Editar
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(record.id)}
          >
            🗑 Eliminar
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

    </div>
  );

}