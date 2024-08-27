import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      jwt: localStorage.getItem("jwt") || "",
      userRole: localStorage.getItem("userRole") || "Client",
      payload: null,
      error: "",
    };
  },
  getters: {
    getJwt: (state) => state.jwt,
    isAuthenticated: (state) => !!state.jwt,
    getUserRole:(state) => state.userRole,
    getPayload: (state) => state.payload
  },
  actions: {
    setJwt(token) {
      this.jwt = "JWT "+token;
      localStorage.setItem("jwt", "JWT "+token);  // Almacenar el JWT en localStorage
    },
    clearJwt() {
      this.jwt = "";
      localStorage.removeItem("jwt");  // Eliminar el JWT de localStorage
    },
    clearUserRole() {
      this.userRole = "";
      localStorage.removeItem("userRole");
    },
    clearPayload() {
      this.payload = null;
    },
    setError(error) {
      this.error = error;
    }
    ,
    setUserRole(role) {
      this.userRole = role;
      localStorage.setItem("userRole", role);
    },
    setPayload(payload) {
      this.payload = payload;
    }
  }
});
