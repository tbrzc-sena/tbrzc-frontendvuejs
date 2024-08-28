<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from "vue-router";
const route = useRoute();
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Skeleton from "primevue/skeleton";

let tipoVehiculoId = ref(route.params.id);
let decodedID = computed(() => atob(tipoVehiculoId.value).split(":")[1]);

let tipoVehiculo = ref({
  id: "",
  nombre: "",
});

const UPDATE_TIPO_VEHICULO_MUTATION = gql`
  mutation updateTipoVehiculoMutation($id: ID!, $nombre: String!) {
    updateCarType(id: $id, name: $nombre) {
      carType {
        name
      }
    }
  }
`;

const GET_TIPO_VEHICULO_BY_ID_QUERY = gql`
  query getTipoVehiculoById($id: ID!) {
    carType(id: $id) {
      id
      name
    }
  }
`;

const { mutate } = useMutation(UPDATE_TIPO_VEHICULO_MUTATION);

const updateTipoVehiculo = async () => {
  try {
    const response = await mutate({
      id: tipoVehiculo.value.id,
      nombre: tipoVehiculo.value.nombre,
    });
    router.push({ name: "listaTiposVehiculo" });
  } catch (error) {
    console.error(error);
  }
};

const { result, loading, error } = useQuery(
  GET_TIPO_VEHICULO_BY_ID_QUERY,
  () => ({
    id: decodedID.value,
  }),{
  enabled: computed(() => !!decodedID.value)
}
);
const loadTipoVehiculoData = () => {
  watch(
    [result, loading, error],
    () => {
      if (!loading.value && !error.value && result.value) {
        tipoVehiculo.value = {
          id: decodedID.value,
          nombre: result.value.carType.name,
        };
      }
    },
    { immediate: true }
  );
};
watch(
  () => route.params.id,
  (newId) => {
    tipoVehiculoId.value = newId;
    if (decodedID.value) {
    loadTipoVehiculoData();
    }
  },
  { immediate: true }
);

const showToast = () => {
  if (
    tipoVehiculo.value.nombre.trim() === "" ||
    tipoVehiculo.value.nombre.length < 4
  ) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un nombre valido para el tipo de vehiculo",
      life: 3000,
    });
  } else {
    updateTipoVehiculo();
  }
};
</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Actualizar Tipo vehiculo</h1>
        <form @submit.prevent>
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
            <Toast />
            <button
              type="submit"
              @click="showToast()"
              class="border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar
            </button>
            <RouterLink
              :to="{
                name: 'listaTiposVehiculo',
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
