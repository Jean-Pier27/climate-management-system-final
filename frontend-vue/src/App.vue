<template>
  <Login v-if="!authenticated" @logged-in="handleLogin" />

  <div v-else class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="text-primary fw-bold">
          🌦 Sistema de Gestión Climática
        </h1>
        <p class="text-muted mb-0">
          Frontend Vue protegido con JWT
        </p>
      </div>

      <button class="btn btn-outline-danger" @click="handleLogout">
        Cerrar sesión
      </button>
    </div>

    <ClimateList />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ClimateList from './components/ClimateList.vue'
import Login from './components/Login.vue'
import { isLoggedIn, logout } from './services/authService'

const authenticated = ref(isLoggedIn())

function handleLogin() {
  authenticated.value = true
}

function handleLogout() {
  logout()
  authenticated.value = false
}
</script>