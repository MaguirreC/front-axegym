<template>
   <div class="main-content d-flex flex-column align-items-center">
    <div v-if="title" class="header w-100 text-center mb-4">
      <h1>{{ title }}</h1>
    </div>
    <slot></slot> <!-- Contenido dinámico -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>
<style scoped>
.main-content {
  flex: 1; /* Ocupa todo el espacio restante */
  margin-left: 250px; /* Ancho del sidebar */
  padding: 20px;
  min-height: 100vh; /* Ocupa toda la altura */
  overflow: auto; /* Evita desbordamiento */
  display: flex;
  flex-direction: column; /* Organiza los hijos en columna */
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff; /* Fondo blanco */
}
.header {
  padding-bottom: 20px;
  margin-top: 100px;
}
</style>
