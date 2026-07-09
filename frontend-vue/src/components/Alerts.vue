<template>
  <div class="card shadow mb-4">
    <div class="card-header bg-dark text-white fw-bold">
      ⚠ Alertas Climáticas
    </div>

    <div class="card-body">
      <div v-if="alerts.length === 0" class="alert alert-success mb-0">
        ✅ No existen alertas climáticas.
      </div>

      <div
        v-for="(alert, index) in alerts"
        v-else
        :key="index"
        :class="`alert alert-${alert.type} mb-2`"
      >
        {{ alert.message }}
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

const alerts = computed(() => {
  const result: {
    message: string
    type: 'danger' | 'warning' | 'info'
  }[] = []

  props.records.forEach((record) => {
    if (record.temperature >= 40) {
      result.push({
        message: `🔥 Temperatura muy alta en ${record.city}: ${record.temperature} °C`,
        type: 'danger',
      })
    }

    if (record.temperature <= 10) {
      result.push({
        message: `❄ Temperatura muy baja en ${record.city}: ${record.temperature} °C`,
        type: 'info',
      })
    }

    if (record.humidity >= 80) {
      result.push({
        message: `💧 Humedad elevada en ${record.city}: ${record.humidity}%`,
        type: 'warning',
      })
    }
  })

  return result
})
</script>