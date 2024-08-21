<script setup >
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";</script>

<template>
<div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Nuevo modelo vehiculo</h1>

      </div>
    </div>
  </div>
</template>

<style scoped></style>