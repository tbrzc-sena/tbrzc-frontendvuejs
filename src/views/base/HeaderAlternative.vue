<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from "../../store/Auth";
const store = useAuthStore();
const router = useRouter();


const logout = () => {
  store.clearJwt();
  store.clearUserRole();
  router.push({ name: 'loginview' });
};
</script>
<template>
    <header
        class="sticky top-0 flex items-center justify-center bg-white shadow-[0_4px_9px_-4px_#cbcbcb]"
      >
        <nav class="m-2 w-full">
          <div class="flex items-center font-mono" role="navigation">
            <RouterLink
            :to="{ name: 'homeview' }"
            class="mx-4 hidden w-1/5 lg:inline-block"
          >
          <div class="flex">
                <img
                  src="/public/assets/imgs/autocarpet_logo.webp"
                  alt=""
                  class="my-0"
                />
              </div>
          </RouterLink>
            <div class="flex grow">
              <!--
              <input
                type="text"
                placeholder="¿Que estas buscando?"
                class="w-full rounded-r-none font-sans focus:ring-0"
                
              />
              <button
                class="relative flex items-center rounded-l-none uppercase focus:ring-0"
                type="button"
              >
                <span class="fas fa-search"></span>
              </button>
-->
            </div>
            <div class="ml-4 cursor-pointer md:hidden">
              <span class="fas fa-bars text-4xl"></span>
            </div>
            <div class="hidden grow md:block">
              <ul class="flex items-center justify-evenly">
                <li class="mx-1">
                <RouterLink :to="{ name: 'contactview' }"
                  >Contáctenos</RouterLink
                >
              </li>
              <li class="mx-1">
                <RouterLink :to="{ name: 'productosview', params: {'categoria': ' '} }"
                  >Productos</RouterLink
                >
              </li>
              <li class="mx-1" v-if="store.isAuthenticated" @click="logout()" >
                <button>
                  Cerrar sesión
                </button>

              </li>
              <li class="mx-1" v-else>
                <RouterLink
                  :to="{ name: 'loginview' }"
                  class="  px-4 py-2 rounded"
                  >Ingresar</RouterLink
                >
              </li>
              <li class="mx-1" v-if="store.getUserRole == 'Client'">
                <RouterLink :to="{ name: 'dashboard' }"
                  >Perfil</RouterLink
                >
              </li>
              <!--
              <li class="mx-1">
                <RouterLink
                  :to="{ name: 'carritodecompras' }"
                  class="  px-4 py-2 rounded"
                  >Compras<span class="fa-solid fa-cart-shopping"></span></RouterLink
                >
              </li>
              -->
              </ul>
            </div>
          </div>
        </nav>
      </header>

</template>
<style scoped></style>