import { useEffect, useState } from "react";
import type { ClimateRecord } from "../models/ClimateRecord";

interface ClimateFormProps {
  onCreate: (record: Omit<ClimateRecord, "id">) => void;
  onUpdate: (record: Omit<ClimateRecord, "id">) => void;
  selectedRecord: ClimateRecord | null;
}

export default function ClimateForm({
  onCreate,
  onUpdate,
  selectedRecord,
}: ClimateFormProps) {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    if (selectedRecord) {
      setCity(selectedRecord.city);
      setTemperature(selectedRecord.temperature);
      setHumidity(selectedRecord.humidity);
      setPressure(selectedRecord.pressure);
    }
  }, [selectedRecord]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const recordData: Omit<ClimateRecord, "id"> = {
      city,
      temperature,
      humidity,
      pressure,
      date: selectedRecord
        ? selectedRecord.date
        : new Date().toISOString(),
    };

    if (selectedRecord) {
    onUpdate(recordData);
    } else {
    onCreate(recordData);
    }

    setCity("");
    setTemperature(0);
    setHumidity(0);
    setPressure(0);
  }

  return (
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
                type="text"
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

          <button type="submit" className="btn btn-success">
            {selectedRecord ? "Actualizar Registro" : "Guardar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}