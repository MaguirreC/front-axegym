import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";


const apiBaseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", () => {
  const token = ref(sessionStorage.getItem("token") || null);
  const user = ref(sessionStorage.getItem("user") || null);

  const setToken = (jwt, username) => {
    token.value = jwt;
    user.value = username;
    sessionStorage.setItem("token", jwt);
    sessionStorage.setItem("user", username);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/authenticate`, credentials);

      if (!response.data || !response.data.jwt) {
        throw new Error("Respuesta del servidor inválida");
      }

      setToken(response.data.jwt, credentials.username);
      return true; // Indicar que el login fue exitoso
    } catch (error) {
      console.error("Error en el login:", error.response?.data?.message || error.message);
      return false; // Indicar que el login falló
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return { token, user, login, logout };
});