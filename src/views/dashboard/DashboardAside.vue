<script setup lang="ts">
import { useAuthStore } from "../../store/Auth.js";
const store = useAuthStore()
import { useRouter } from 'vue-router';
const router = useRouter();

const logout =()=>{
  store.clearJwt()
  store.clearUserRole()
  router.push({ name: 'loginview' });
}
</script>
<template>
  <div class="flex col-span-1 row-span-4 rounded-md">
    <ul class="flex w-full flex-col">
      <li class="p-4">
        <RouterLink :to="{ name: 'homeview' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <div class="hidden md:block">
            <img class="" src="/public/assets/imgs/autocarpet_logo.webp" alt="">
          </div>
        </RouterLink>
      </li>
      <li class="px-4 my-2">
        <span class="font-medium uppercase text-gray-400">Productos</span>
      </li>
      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'productdashboard' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-blue-500">
            <i class="fa-solid fa-boxes-packing text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Productos</span>
        </RouterLink>
      </li>

      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'categorias' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-blue-500">
            <i class="fa-solid fa-list text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Categorias</span>
        </RouterLink>
      </li>
      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'modelosvehiculo' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-blue-500">
            <i class="fa-solid fa-car text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Modelos Vehiculo</span>
        </RouterLink>
      </li>

      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'materiales' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-blue-500">
            <i class="fa-solid fa-th text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Materiales</span>
        </RouterLink>
      </li>

      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'proveedores' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-blue-500">
            <i class="fa-solid fa-boxes-packing text-2x1"></i>
          </span>
          <span class="ml-3 text-lg">Proveedores</span>
        </RouterLink>
      </li>

      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'personalizaciones' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-blue-500">
            <i class="fa-solid fa-highlighter text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Personalizaciónes</span>
        </RouterLink>
      </li>
      <li class="px-4 my-2">
        <RouterLink :to="{ name: 'addproductoview' }" class="flex items-center rounded-lg text-gray-600 hover:bg-gray-100">
          <span class="text-green-400">
            <i class="fa-solid fa-plus text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Nuevo Producto</span>
        </RouterLink>
      </li>
      <li class="px-4 my-2">
        <span class="my-4 flex text-sm font-medium uppercase text-gray-400">Cuenta</span>
        <p>{{ store.getPayload }}</p>
      </li>
      <li class="px-4 my-2">
        <button @click="logout()" class="bg-transparent hover:bg-transparent hover:text-red-500">
          <span class="text-red-500">
            <i class="fa-solid fa-lock-open text-2xl"></i>
          </span>
          <span class="ml-3 text-lg">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>