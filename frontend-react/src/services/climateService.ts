import type { ClimateRecord } from "../models/ClimateRecord";
import { getToken } from "./authService";

const private API_URL = 'http://climate-management-system-final.onrender.com/api/auth';

function getHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getRecords(): Promise<ClimateRecord[]> {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error al obtener registros");
  }

  return response.json();
}

export async function createRecord(
  record: Omit<ClimateRecord, "id">
): Promise<ClimateRecord> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Error al crear registro");
  }

  return response.json();
}

export async function updateRecord(
  id: number,
  record: Omit<ClimateRecord, "id">
): Promise<ClimateRecord> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar registro");
  }

  return response.json();
}

export async function deleteRecord(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error al eliminar registro");
  }
}