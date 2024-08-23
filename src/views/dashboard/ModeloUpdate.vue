<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import { ref } from "vue";

let modeloVehiculo = ref({
  id: "",
  nombre: "",
  year: 0,
  tipoVehiculoId: "",
  marcaVehiculoId: "",
});

const updateModeloVehiculo = async () => {};
</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Actualizar Modelo Vehiculo</h1>
        <form @submit.prevent="updateModeloVehiculo()">

              <div class="flex flex-col gap-2">
                <label for="username">Nombre del Modelo</label>
                <InputText
                  id="username"
                  v-model="modeloVehiculo.nombre"
                  aria-describedby="username-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                />


              <label for="año" class="block text-sm font-medium text-gray-700"
                >Añó</label
              >
              <InputNumber
                v-model="modeloVehiculo.year"
                inputId="minmax"
                :min="1500"
                :max="2024"
                id="año"
                class="border-gray-300 rounded-md shadow-sm w-1/2"
              />
          </div>
          <div class="flex space-x-4">
            <div class="w-1/2">
              <label
                for="tipo-vehiculo"
                class="block text-sm font-medium text-gray-700"
                >Tipo</label
              >
              <div class="flex items-center space-x-2 mt-1">
                <Select
                  v-model="tipo"
                  optionLabel="name"
                  placeholder="Tipo Vehiculo"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  id="tipo-vehiculo"
                />
              </div>
            </div>
            <div class="w-1/2">
              <label
                for="marca-vehiculo"
                class="block text-sm font-medium text-gray-700"
                >Marca</label
              >
              <div class="flex items-center space-x-2 mt-1">
                <Select
                  v-model="marca"
                  optionLabel="name"
                  placeholder="Marca Vehiculo"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  id="marca-vehiculo"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar
            </button>
            <RouterLink
              :to="{
                name: 'listaModelosVehiculo',
              }"
              ><button class="mx-1 hover:bg-red-700 bg-red-600 text-white">
                Volver
              </button></RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
