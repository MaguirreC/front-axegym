<template>
    <div class="container mt-5">
    <!-- Search Bar -->
    <div class="input-group mb-6">
      <input
        type="text"
        class="form-control"
        placeholder="Search client by ID..."
        v-model="searchQuery"
        @keyup.enter="searchClient"
      />
      <button class="btn btn-primary" @click="searchClient">Search</button>
    </div>

    <!-- Show large user icon before searching -->
    <div v-if="!searchQuery && !foundClient" class="text-center mt-4">
      <i class="bi bi-person-circle text-secondary" style="font-size: 100px;"></i>
      <p class="text-muted">Search for a client by ID to display their information</p>
    </div>

    <!-- Client Card if found -->
    <div v-else-if="foundClient" class="d-flex justify-content-center mt-4">
      <ClientCard :client="foundClient" showButtons="true" @delete-client="confirmDelete" />
    </div>

    <!-- Message if not found -->
    <p v-else-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
  </div>
</template>
<script setup>
import ClientCard from '../../components/ClientCard.vue'
import { ref } from "vue";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;
const searchQuery = ref("");
const foundClient = ref(null);
const errorMessage = ref("");

const searchClient = async () => {
  if (!searchQuery.value) return;

  try {
    const response = await axios.get(`${apiBaseUrl}/clients/search`, {
      params: { identification: searchQuery.value },
    });

    foundClient.value = response.data;
    errorMessage.value = "";
  } catch (error) {
    foundClient.value = null;
    errorMessage.value = "Client not found.";
  }
};
const confirmDelete = async (clientId) => {
  if (!confirm('Are you sure you want to delete this client?')) return;

  try {
    await axios.delete(`${apiBaseUrl}/clients/delete/${clientId}`);
    alert('Client deleted successfully!');
    foundClient.value = null; // Oculta la tarjeta tras eliminación
    searchQuery.value = ''; // Limpia la búsqueda
  } catch (error) {
    console.error('Error deleting client:', error);
    alert('Error deleting client.');
  }
};
</script>
<style scoped>
.input-group {
  max-width: 500px;
  margin: auto;
}
</style>