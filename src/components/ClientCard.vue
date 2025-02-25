<template>
    <div class="card text-center shadow" style="width: 24rem;">
    <img
      :src="client.foto || defaultPhoto"
      class="card-img-top rounded-circle mt-3"
      style="width: 120px; height: 120px; margin: auto;"
      alt="User photo"
    />
    <div class="card-body">
      <h5 class="card-title">{{ client.name }}</h5>
      <p class="card-text"><strong>Identification:</strong> {{ client.identification }}</p>
      <p class="card-text"><strong>Phone Number:</strong> {{ client.phoneNumber }}</p>
      <p class="card-text"><strong>Date of Birth:</strong> {{ client.dateOfBirth }}</p>

      <!-- Mostrar membresía si existe -->
      <div v-if="client.memberships && client.memberships.length">
        <h6 class="text-primary mt-3">Membership Details</h6>
        <p class="card-text"><strong>Plan:</strong> {{ client.memberships[0].membershipPlan.name }}</p>
        <p class="card-text"><strong>Price:</strong> ${{ client.memberships[0].membershipPlan.price }}</p>
        <p class="card-text"><strong>Start Date:</strong> {{ client.memberships[0].starDate }}</p>
        <p class="card-text"><strong>Expiration Date:</strong> {{ client.memberships[0].expirationDate }}</p>
        <p class="card-text">
          <strong>Status:</strong>
          <span :class="client.memberships[0].active ? 'text-success' : 'text-danger'">
            {{ client.memberships[0].active ? 'Active' : 'Inactive' }}
          </span>
        </p>
      </div>
      <div v-if="showButtons" class="d-flex justify-content-center mt-2">
        <button class="btn btn-danger me-2" @click="$emit('delete-client', client.id)">
          Delete 
        </button>
        <button type="button" class="btn btn-info">Update</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  client: Object, // Datos del cliente
  showButtons: Boolean, // Para controlar la visibilidad de los botones
  
});

// Default photo if no image is provided
const defaultPhoto = computed(() => { return props.client?.foto || "/default-person.png";});

const activeMembership = computed(() => {
  return props.client?.memberships?.length ? props.client.memberships[0] : null;
});
</script>
<style scoped>
.card {
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}
</style>