import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      jwt: localStorage.getItem("jwt") || "",
      userRole: "USER",
      error: "",
    };
  },
  getters: {
    getJwt: (state) => state.jwt,
    isAuthenticated: (state) => !!state.jwt,
    getUserRole:(state) => state.userRole
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
    setError(error) {
      this.error = error;
    }
    ,
    setUserRole(role) {
      this.userRole = role;
    }
  }
});
