<template>
  <div class="container py-5">
    <div class="text-center mb-4">
      <h1 class="text-primary fw-bold">
        🌦 Sistema de Gestión Climática
      </h1>
      <p class="text-muted">
        Acceso seguro con JWT
      </p>
    </div>

    <div class="card shadow mx-auto" style="max-width: 420px;">
      <div class="card-header bg-primary text-white fw-bold">
        🔐 Iniciar Sesión
      </div>

      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Correo</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              required
            />
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <button class="btn btn-success w-100" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '../services/authService'

const emit = defineEmits<{
  loggedIn: []
}>()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  const success = await login(email.value, password.value)

  if (success) {
    errorMessage.value = ''
    emit('loggedIn')
  } else {
    errorMessage.value = 'Credenciales incorrectas'
  }
}
</script>