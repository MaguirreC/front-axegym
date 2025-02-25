<template>
  <nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="../../images/LOGO-INMOBILIARIA-001-removebg-preview.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top title">
      AXE-GYM
    </a>
    <div v-if="authStore.token" class="navbar-user-info">
      Bienvenido, {{ authStore.user }}
    </div>
  </div>
</nav>
</template>
<script setup>
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>
<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
}
.title{
  font-family: "Playwrite IT Moderna", serif;

}
</style>