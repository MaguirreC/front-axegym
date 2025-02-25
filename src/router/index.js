import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Clients from "../views/clients/clients.vue";
import NewTrainer from "../views/trainers/newTrainer.vue";
import NewMembership from "../views/membership/newMembership.vue";
import PlanMembership from "../views/membership/planMembership.vue";
import SearchClient from "../views/clients/searchClient.vue";
import SearchTrainer from "../views/trainers/searchTrainer.vue";
import Schedule from "../views/trainers/schedule.vue";
import Login from "../views/auth/login.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    meta: { requiresAuth: true, title: "Register new client" }, // ✅ Protegida
  },
  {
    path: "/clients/search",
    name: "SearchClients",
    component: SearchClient,
    meta: { requiresAuth: true, title: "Search Client" }, // ✅ Protegida
  },
  {
    path: "/newtrainer",
    name: "Trainer",
    component: NewTrainer,
    meta: { requiresAuth: true, title: "Register new trainer" }, // ✅ Protegida
  },
  {
    path: "/trainers/search",
    name: "SearchTrainers",
    component: SearchTrainer,
    meta: { requiresAuth: true, title: "Search Trainer" }, // ✅ Protegida
  },
  {
    path: "/newmembership",
    name: "newMembership",
    component: NewMembership,
    meta: { requiresAuth: true, title: "New membership" }, // ✅ Protegida
  },
  {
    path: "/planmembership",
    name: "planMembership",
    component: PlanMembership,
    meta: { requiresAuth: true, title: "New Plan membership" }, // ✅ Protegida
  },
  {
    path: "/schedule",
    name: "schedule",
    component: Schedule,
    meta: { requiresAuth: true, title: "Schedule" }, // ✅ Protegida
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "Login" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Proteger rutas con beforeEach
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    alert("⚠ Atención: Debes iniciar sesión para acceder a esta página.");
    next("/login");
  } else {
    sessionStorage.removeItem("showAlert");
    next();
  }
});

export default router;