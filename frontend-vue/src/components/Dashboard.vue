<template>
  <div class="row mb-4">
    <div class="col-md-4 mb-3">
      <div class="card text-white bg-primary shadow">
        <div class="card-body text-center">
          <h5>📋 Total Registros</h5>
          <h2>{{ totalRecords }}</h2>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card text-white bg-success shadow">
        <div class="card-body text-center">
          <h5>🌡 Temperatura Promedio</h5>
          <h2>{{ averageTemperature.toFixed(1) }} °C</h2>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card text-white bg-info shadow">
        <div class="card-body text-center">
          <h5>💧 Humedad Promedio</h5>
          <h2>{{ averageHumidity.toFixed(1) }} %</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ClimateRecord } from '../models/ClimateRecord'

const props = defineProps<{
  records: ClimateRecord[]
}>()

const totalRecords = computed(() => props.records.length)

const averageTemperature = computed(() => {
  if (props.records.length === 0) return 0

  const total = props.records.reduce(
    (sum, record) => sum + record.temperature,
    0
  )

  return total / props.records.length
})

const averageHumidity = computed(() => {
  if (props.records.length === 0) return 0

  const total = props.records.reduce(
    (sum, record) => sum + record.humidity,
    0
  )

  return total / props.records.length
})
</script>