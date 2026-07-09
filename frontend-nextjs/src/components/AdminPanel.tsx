"use client";

import { useEffect, useState } from "react";
import type { ClimateRecord } from "../models/ClimateRecord";
import Login from "./Login";
import { isLoggedIn, logout } from "../services/authService";
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../services/climateService";
import Dashboard from "./Dashboard";

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
    setAuthenticated(isLoggedIn());
   }, []);
  const [records, setRecords] = useState<ClimateRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ClimateRecord | null>(null);
  const [searchText, setSearchText] = useState("");

  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const data = await getRecords();
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const recordData: Omit<ClimateRecord, "id"> = {
      city,
      temperature,
      humidity,
      pressure,
      date: selectedRecord ? selectedRecord.date : new Date().toISOString(),
    };

    try {
      if (selectedRecord) {
        await updateRecord(selectedRecord.id, recordData);
        setSelectedRecord(null);
      } else {
        await createRecord(recordData);
      }

      clearForm();
      await loadRecords();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(record: ClimateRecord) {
    setSelectedRecord(record);
    setCity(record.city);
    setTemperature(record.temperature);
    setHumidity(record.humidity);
    setPressure(record.pressure);
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

  function clearForm() {
    setCity("");
    setTemperature(0);
    setHumidity(0);
    setPressure(0);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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

  const filteredRecords = records.filter((record) =>
    record.city.toLowerCase().includes(searchText.toLowerCase())
  );

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

if (!authenticated) {
  return <Login onLogin={() => setAuthenticated(true)} />;
}

  return (
    <main className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
      <h1 className="text-primary fw-bold">
      ⚙️ Panel Administrativo
      </h1>
      <p className="text-muted mb-0">
        Panel Next.js protegido con JWT
      </p>
     </div>

      <button
      className="btn btn-outline-danger"
      onClick={() => {
      logout();
      setAuthenticated(false);
      }}
       >
      Cerrar sesión
    </button>
</div>

      <Dashboard records={records} />

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
           alerts.map((alert) => (
           <div key={alert.id} className={`alert alert-${alert.type} mb-2`}>
           {alert.message}
            </div>
            ))
          )}
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white fw-bold">
          {selectedRecord
            ? "✏️ Editar Registro Climático"
            : "📝 Nuevo Registro Climático"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Ciudad</label>
                <input
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Temperatura</label>
                <input
                  type="number"
                  className="form-control"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Humedad</label>
                <input
                  type="number"
                  className="form-control"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Presión</label>
                <input
                  type="number"
                  className="form-control"
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <button className="btn btn-success" type="submit">
              {selectedRecord ? "Actualizar Registro" : "Guardar Registro"}
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-dark text-white fw-bold">
          📋 Gestión de Registros Climáticos ({filteredRecords.length})
        </div>

        <div className="card-body table-responsive">
          <input
            className="form-control mb-3"
            placeholder="🔍 Buscar ciudad..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
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
                    📭 No existen registros climáticos.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td className="fw-bold">📍 {record.city}</td>

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
                    <td>{formatDate(record.date)}</td>

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
      </div>
    </main>
  );
}