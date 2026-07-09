<template>
  <div class="card shadow mb-4">
    <div class="card-header bg-primary text-white fw-bold">
      {{ selectedRecord ? '✏️ Editar Registro Climático' : '📝 Nuevo Registro Climático' }}
    </div>

    <div class="card-body">
      <form @submit.prevent="saveRecord">
        <div class="row">
          <div class="col-md-3 mb-3">
            <label class="form-label">Ciudad</label>
            <input v-model="city" type="text" class="form-control" required />
          </div>

          <div class="col-md-3 mb-3">
            <label class="form-label">Temperatura</label>
            <input v-model.number="temperature" type="number" class="form-control" required />
          </div>

          <div class="col-md-3 mb-3">
            <label class="form-label">Humedad</label>
            <input v-model.number="humidity" type="number" class="form-control" required />
          </div>

          <div class="col-md-3 mb-3">
            <label class="form-label">Presión</label>
            <input v-model.number="pressure" type="number" class="form-control" required />
          </div>
        </div>

        <button class="btn btn-success" type="submit">
          {{ selectedRecord ? 'Actualizar Registro' : 'Guardar Registro' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ClimateRecord } from '../models/ClimateRecord'

const props = defineProps<{
  selectedRecord: ClimateRecord | null
}>()

const emit = defineEmits<{
  recordCreated: [record: Omit<ClimateRecord, 'id'>]
  recordUpdated: [record: Omit<ClimateRecord, 'id'>]
}>()

const city = ref('')
const temperature = ref(0)
const humidity = ref(0)
const pressure = ref(0)

watch(
  () => props.selectedRecord,
  (record) => {
    if (record) {
      city.value = record.city
      temperature.value = record.temperature
      humidity.value = record.humidity
      pressure.value = record.pressure
    }
  }
)

function saveRecord() {
  const recordData: Omit<ClimateRecord, 'id'> = {
    city: city.value,
    temperature: temperature.value,
    humidity: humidity.value,
    pressure: pressure.value,
    date: props.selectedRecord
      ? props.selectedRecord.date
      : new Date().toISOString(),
  }

  if (props.selectedRecord) {
    emit('recordUpdated', recordData)
  } else {
    emit('recordCreated', recordData)
  }

  city.value = ''
  temperature.value = 0
  humidity.value = 0
  pressure.value = 0
}
</script>