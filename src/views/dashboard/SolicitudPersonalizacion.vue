<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import Message from "primevue/message";
</script>
<template>
  <div class="min-h-screen">
    <DashboardHeader></DashboardHeader>
    <main>
      <div class="grid grid-cols-4 h-screen">
        <DashboardAside></DashboardAside>
        <div
          class="col-span-3 m-5 row-span-3 shadow overflow-hidden rounded border-b border-gray-200 bg-white"
        >
        <Message class="w-full h-full flex items-center justify-center text-center" severity="warn"
            >Esta sección está siendo modificada o el contenido aún no ha sido
            agregado. Por favor, vuelve más tarde ❤️</Message
          >
        </div>

      </div>
    </main>
  </div>
</template>
