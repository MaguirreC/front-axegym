<template>
    <div class="card text-center shadow" style="width: 24rem;">
    <img
      :src="trainer.foto || defaultPhoto"
      class="card-img-top rounded-circle mt-3"
      style="width: 120px; height: 120px; margin: auto;"
      alt="User photo"
    />
    <div class="card-body">
      <h5 class="card-title">{{ trainer.name }}</h5>
      <p class="card-text"><strong>Identification:</strong> {{ trainer.identification }}</p>
      <p class="card-text"><strong>Phone Number:</strong> {{ trainer.phoneNumber }}</p>
      <p class="card-text"><strong>Date of Birth:</strong> {{ trainer.dateOfBirth }}</p>

      <div v-if="showButtons" class="d-flex justify-content-center mt-2">
         <div>
       <button class="btn btn-danger me-2" @click="$emit('delete-trainer', trainer.id)">
            Delete
        </button>
         <button type="button" class="btn btn-info">Update</button>
      <div class="d-flex justify-content-center mt-2">
      <button type="button" class="btn btn-dark" @click="$emit('fetch-shifts', trainer.id)">Shifts</button>
    </div>
  </div>
</div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  trainer: Object, // Datos del trainere
  showButtons: Boolean, // Para controlar la visibilidad de los botones
  
});

// Default photo if no image is provided
const defaultPhoto = computed(() => { return props.trainer?.foto || "/default-person.png";});

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