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

let marcaId = ref(route.params.id);
let decodedID = computed(() => atob(marcaId.value).split(":")[1]);

let marcaVehiculo = ref({
  id: "",
  nombre: "",
});
const UPDATE_MARCA_MUTATION = gql`
  mutation updateMarcaMutation($id: ID!, $nombre: String!) {
    updateCarMake(id: $id, name: $nombre) {
      carMake {
        name
      }
    }
  }
`;

const GET_MARCA_BY_ID_QUERY = gql`
  query getMarcaById($id: ID!) {
    carMake(id: $id) {
      id
      name
    }
  }
`;

const { mutate } = useMutation(UPDATE_MARCA_MUTATION);

const updateMarcaVehiculo = async () => {
  try {
    const response = await mutate({
      id: marcaVehiculo.value.id,
      nombre: marcaVehiculo.value.nombre,
    });
    router.push({ name: "marcasvehiculos" });
  } catch (error) {
    console.error(error);
  }
};

const { result, loading, error } = useQuery(GET_MARCA_BY_ID_QUERY, () => ({
  id: decodedID.value,
}),{
  enabled: computed(() => !!decodedID.value)
});
const loadMarcaData = () => {
  watch(
    [result, loading, error],
    () => {
      if (!loading.value && !error.value && result.value) {
        marcaVehiculo.value = {
          id: decodedID.value,
          nombre: result.value.carMake.name,
        };
      }
    },
    { immediate: true }
  );
};
watch(
  () => route.params.id,
  (newId) => {
    marcaId.value = newId;
    if (decodedID.value) {
      loadMarcaData();
    }
  },
  { immediate: true }
);

const showToast = () => {
  if (
    marcaVehiculo.value.nombre.trim() === "" ||
    marcaVehiculo.value.nombre.length < 5
  ) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un nombre valido para el tipo de vehiculo",
      life: 3000,
    });
  } else {
    updateMarcaVehiculo();
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
                  v-model="marcaVehiculo.nombre"
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
