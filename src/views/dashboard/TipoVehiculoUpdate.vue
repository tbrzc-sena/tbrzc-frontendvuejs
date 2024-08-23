<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import { ref } from "vue";


let tipoVehiculo = ref({
  id: "",
  nombre: "",
});

const updateTipoVehiculo = async () => {

};
</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Actualizar Tipo vehiculo</h1>
        <form @submit.prevent="updateTipoVehiculo()">
          <div class="flex justify-stretch gap-4">
            <div class="w-1/2">
              <div class="flex flex-col gap-2">
                <label for="username">Nombre del tipo de vehiculo</label>
                <InputText
                  id="username"
                  v-model="tipoVehiculo.nombre"
                  aria-describedby="username-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
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
                      name: 'listaTiposVehiculo',
                    }"
                    ><button class="mx-1 hover:bg-red-700 bg-red-600  text-white">Volver</button></RouterLink
                  >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
