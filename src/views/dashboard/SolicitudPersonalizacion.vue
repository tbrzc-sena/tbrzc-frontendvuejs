<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

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
        <div class="flex justify-end p-4">
            <button class="hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
