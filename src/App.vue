<script setup>
import { watch,onMounted,ref,watchEffect } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { useRoute } from "vue-router";
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import LayoutMain from './components/LayoutMain.vue';

const showAlert = ref(false);
const route = useRoute();


</script>

<template>
<Navbar />
  <div class="wrapper">
    <Sidebar />
    <LayoutMain :title="$route.meta.title">
      <router-view></router-view> 
    </LayoutMain>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
