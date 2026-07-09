<template>
  <Dashboard :records="records" />

  <Alerts :records="records" />

  <ClimateForm
    :selected-record="selectedRecord"
    @record-created="handleCreate"
    @record-updated="handleUpdate"
  />

  <div class="card shadow">
    <div class="card-header bg-dark text-white fw-bold">
      📋 Registros Climáticos ({{ filteredRecords.length }})
    </div>

    <div class="card-body table-responsive">
      <input
       v-model="searchText"
       type="text"
       class="form-control shadow-sm mb-3"
       placeholder="🔍 Buscar registros por ciudad..."
       />

      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
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
          <tr v-if="filteredRecords.length === 0">
         <td colspan="7" class="text-center text-muted py-4">
         📭 No existen registros climáticos.
          </td>
         </tr>

          <tr
          v-for="record in filteredRecords"
          :key="record.id"
          v-else
           >
            <td>{{ record.id }}</td>
            <td class="fw-bold">📍 {{ record.city }}</td>
            <td><span :class="`badge ${getTemperatureBadge(record.temperature)}`">{{ record.temperature }} °C</span></td>
            <td><span :class="`badge ${getHumidityBadge(record.humidity)}`">{{ record.humidity }} %</span></td>
            <td>{{ record.pressure }} hPa</td>
            <td>{{ formatDate(record.date) }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="handleEdit(record)"
              >
                ✏️ Editar
              </button>

              <button
                class="btn btn-danger btn-sm"
                @click="handleDelete(record.id)"
              >
                🗑 Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ClimateRecord } from '../models/ClimateRecord'
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from '../services/climateService'
import Alerts from './Alerts.vue'
import Dashboard from './Dashboard.vue'
import ClimateForm from './ClimateForm.vue'

const records = ref<ClimateRecord[]>([])
const selectedRecord = ref<ClimateRecord | null>(null)
const searchText = ref('')

const filteredRecords = computed(() => {
  return [...records.value]
    .filter((record) =>
      record.city.toLowerCase().includes(searchText.value.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
})

onMounted(() => {
  loadRecords()
})

async function loadRecords() {
  try {
    records.value = await getRecords()
  } catch (error) {
    console.error(error)
  }
}

async function handleCreate(record: Omit<ClimateRecord, 'id'>) {
  try {
    await createRecord(record)
    await loadRecords()
  } catch (error) {
    console.error(error)
  }
}

function handleEdit(record: ClimateRecord) {
  selectedRecord.value = { ...record }
}

async function handleUpdate(record: Omit<ClimateRecord, 'id'>) {
  if (!selectedRecord.value) return

  try {
    await updateRecord(selectedRecord.value.id, record)
    selectedRecord.value = null
    await loadRecords()
  } catch (error) {
    console.error(error)
  }
}

async function handleDelete(id: number) {
  const confirmDelete = confirm('¿Seguro que deseas eliminar este registro?')

  if (!confirmDelete) return

  try {
    await deleteRecord(id)
    await loadRecords()
  } catch (error) {
    console.error(error)
  }
}

function getTemperatureBadge(temp: number) {
  if (temp >= 40) return 'bg-danger'
  if (temp >= 30) return 'bg-warning text-dark'
  return 'bg-success'
}

function getHumidityBadge(humidity: number) {
  if (humidity >= 80) return 'bg-danger'
  if (humidity >= 60) return 'bg-warning text-dark'
  return 'bg-primary'
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>