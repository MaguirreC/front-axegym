import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';

const pinia = createPinia();

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
app.use(ElementPlus)

axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );