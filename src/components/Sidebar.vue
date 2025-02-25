<template>
 <div class="container-fluid">
    <div class="row">
      <div class="sidebar col-auto bg-dark text-white min-vh-100 d-flex flex-column align-items-start p-3" :class="{ 'collapsed': isCollapsed || isScreenSmall }">
        <!-- Botón Hamburguesa -->
        <div class="d-flex w-100 align-items-center mb-3" style="margin-top: 2.5rem;">
          <button @click="toggleSidebar" class="btn btn-dark">
            <i class="bi bi-list"></i>
          </button>
        </div>
        <div class="pb-1 px-2 w-100 d-flex align-items-center">
          <router-link to="/" class="text-white text-decoration-none fs-4 fw-bold d-flex align-items-center">
            <i class="bi bi-app"></i>
            <span class="fs-4 ms-2" :class="{ 'd-none': isCollapsed || isScreenSmall }">Dashboard</span>
          </router-link>
        </div>
        <hr class="text-white w-100">
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white d-flex align-items-center gap-2">
              <i class="bi bi-house"></i>
              <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Home</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link to="#" class="nav-link dropdown-toggle text-white d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              <i class="bi bi-clipboard-check"></i>
              <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Attendance</span>
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/new-attendance">New Attendance</router-link></li>
              <li><router-link class="dropdown-item" to="/search-attendances">Search Attendances</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link to="#" class="nav-link dropdown-toggle text-white d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle"></i>
              <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Clients</span>
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/clients">New Client</router-link></li>
              <li><router-link class="dropdown-item" to="/clients/search">Search Client</router-link></li>
              <li><router-link class="dropdown-item" to="/delete-client">Delete Client</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link to="#" class="nav-link dropdown-toggle text-white d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              <i class="bi bi-person-badge"></i>
              <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Trainers</span>
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/schedule">Schedule Trainer</router-link></li>
              <li><router-link class="dropdown-item" to="/newtrainer">New Trainer</router-link></li>
              <li><router-link class="dropdown-item" to="/trainers/search">Search Trainer</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link to="#" class="nav-link dropdown-toggle text-white d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              <i class="bi bi-card-text"></i>
              <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Memberships</span>
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/newmembership">New Membership</router-link></li>
              <li><router-link class="dropdown-item" to="/see-memberships">See Memberships</router-link></li>
              <li><router-link class="dropdown-item" to="/planmembership">New plan</router-link></li>
              <li><router-link class="dropdown-item" to="/delete-memberships">Delete memberships</router-link></li>
            </ul>
          </li>
        </ul>
        <div class="mt-auto">
          <hr class="text-white w-100">
          <router-link to="/login" v-if="!authStore.token" class="nav-link text-white d-flex align-items-center gap-2">
            <i class="bi bi-box-arrow-right"></i>
            <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Login</span>
          </router-link>
          <button v-if="authStore.token" @click="logout" class="btn btn-dark d-flex align-items-center gap-2">
            <i class="bi bi-box-arrow-right"></i>
            <span :class="{ 'd-none': isCollapsed || isScreenSmall }">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onBeforeUnmount,onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const isCollapsed = ref(false);
const isScreenSmall = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const checkScreenSize = () => {
  isScreenSmall.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #212529;
  padding: 1rem;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 80px; /* Ancho ajustado cuando está colapsado */
}

.nav-link .bi {
  font-size: 1.5rem;
}

.nav-link .d-none {
  display: none !important;
}

.btn-dark i {
  font-size: 1.25rem; /* Tamaño del icono del botón "hamburguesa" */
}

/* Media query para ajustar automáticamente el sidebar en pantallas pequeñas */
@media (max-width: 768px) {
  .sidebar {
    width: 80px; /* Ancho ajustado para pantallas pequeñas */
  }
  .sidebar .d-none {
    display: none !important;
  }
}
</style>
