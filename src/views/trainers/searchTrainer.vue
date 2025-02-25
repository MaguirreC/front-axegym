<template>
    <div class="container mt-5">
    <!-- Search Bar -->
    <div class="input-group mb-6">
      <input
        type="text"
        class="form-control"
        placeholder="Search trainer by ID..."
        v-model="searchQuery"
        @keyup.enter="searchTrainer"
      />
      <button class="btn btn-primary" @click="searchTrainer">Search</button>
    </div>

    <!-- Show large user icon before searching -->
    <div v-if="!searchQuery && !foundTrainer" class="text-center mt-4">
      <i class="bi bi-person-circle text-secondary" style="font-size: 100px;"></i>
      <p class="text-muted">Search for a trainer by ID to display their information</p>
    </div>

    <!-- Client Card if found -->
    <div v-else-if="foundTrainer" class="d-flex justify-content-center mt-4">
      <TrainerCard :trainer="foundTrainer" showButtons="true" @delete-trient="confirmDelete" @fetch-shifts="fetchShifts" />
    </div>

    <!-- Message if not found -->
    <p v-else-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
    <!-- Lista de turnos si se encuentran -->
    <div v-if="shifts.length" class="mt-4">
      <h3>Trainers Shifts</h3>
      <ul>
        <li v-for="shift in shifts" :key="shift.id">{{ shift.date }} - {{ shift.shift }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import ClientCard from '../../components/ClientCard.vue'
import { ref } from "vue";
import axios from "axios";
import TrainerCard from '../../components/TrainerCard.vue';
const shifts = ref([]);

const apiBaseUrl = import.meta.env.VITE_API_URL;
const searchQuery = ref("");
const foundTrainer = ref(null);
const errorMessage = ref("");

const searchTrainer = async () => {
  if (!searchQuery.value) return;

  try {
    const response = await axios.get(`${apiBaseUrl}}/trainers/search`, {
      params: { identification: searchQuery.value },
    });

    foundTrainer.value = response.data;
    errorMessage.value = "";
  } catch (error) {
    foundTrainer.value = null;
    errorMessage.value = "Trainer not found.";
  }
};

const confirmDelete = async (clientId) => {
  if (!confirm('Are you sure you want to delete this client?')) return;

  try {
    await axios.delete(`http://localhost:8080/clients/delete/${clientId}`);
    alert('Client deleted successfully!');
    foundClient.value = null; // Oculta la tarjeta tras eliminación
    searchQuery.value = ''; // Limpia la búsqueda
  } catch (error) {
    console.error('Error deleting client:', error);
    alert('Error deleting client.');
  }
};
const fetchShifts = async (trainerId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/schedule/id?id=${trainerId}`);
    shifts.value = response.data;
  } catch (error) {
    console.error('Error fetching shifts:', error);
    alert('Error obteniendo los turnos.');
  }
};
</script>
<style scoped>
.input-group {
  max-width: 500px;
  margin: auto;
}
</style>