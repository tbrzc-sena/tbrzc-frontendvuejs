<script setup>
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useQuery } from "@vue/apollo-composable";
import Skeleton from "primevue/skeleton";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Toast from "primevue/toast";

const TIPO_MODELO_QUERY = gql`
  query {
    carTypes {
      edges {
        node {
          id
          name
        }
      }
    }
    carMakes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const ADD_MODELO_VEHICULO_QUERY = gql`
  mutation newModeloVehiculo(
    $nombre: String!
    $year: Int!
    $tipoVehiculoId: ID!
    $marcaVehiculoId: ID!
  ) {
    createCarModel(
      name: $nombre
      year: $year
      typeId: $tipoVehiculoId
      makeId: $marcaVehiculoId
    ) {
      carModel {
        name
      }
    }
  }
`;

let tipo = ref();
let marca = ref();
let modeloVehiculo = ref({
  nombre: "",
  year: 0,
  tipoVehiculoId: "",
  marcaVehiculoId: "",
});

const { result, loading, error } = useQuery(TIPO_MODELO_QUERY);
watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      tipo.value = result.value.carTypes.edges.map((edge) => edge.node);
      marca.value = result.value.carMakes.edges.map((edge) => edge.node);
    }
  },
  { immediate: true }
);

const { mutate: data } = useMutation(ADD_MODELO_VEHICULO_QUERY);
const newModeloVehiculo = async () => {
  try {
    const response = await data({
      nombre: modeloVehiculo.value.nombre,
      year: modeloVehiculo.value.year,
      tipoVehiculoId: atob(modeloVehiculo.value.tipoVehiculoId.id).split(
        ":"
      )[1],
      marcaVehiculoId: atob(modeloVehiculo.value.marcaVehiculoId.id).split(
        ":"
      )[1],
    });
    router.push({ name: "listaModelosVehiculo" });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ya existe un modelo con ese nombre",
      life: 1000,
    });
    console.log(error);
  }
};

const showToast = () => {
  if (modeloVehiculo.value.nombre === "" || modeloVehiculo.value.nombre.trim() === "" || modeloVehiculo.value.nombre.length < 3) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un nombre valido para la categoria",
      life: 3000,
    });
  } else {
    newModeloVehiculo();
  }


};
</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Nuevo modelo vehiculo</h1>
        <form @submit.prevent class="space-y-6">
          <div class="flex space-x-4">
            <div class="w-2/3">
              <label
                for="nombre-modelo"
                class="block text-sm font-medium text-gray-700"
                >Nombre del modelo</label
              >
              <InputText
                type="text"
                v-model="modeloVehiculo.nombre"
                id="nombre-modelo"
                :invalid="modeloVehiculo.nombre === ''"
                class="w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Nombre del modelo"
              />
            </div>
            <div>
              <label for="año" class="block text-sm font-medium text-gray-700"
                >Añó</label
              >
              <InputNumber
                v-model="modeloVehiculo.year"
                inputId="minmax"
                :min="1974"
                :max="2024"
                id="año"
                class="border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div v-if="loading">
            <Skeleton width="10rem" height="4rem"></Skeleton>
          </div>
          <div class="flex space-x-4" v-else>
            <div class="w-1/2">
              <div class="flex items-center space-x-2 mt-1">
                <Select
                  v-model="modeloVehiculo.tipoVehiculoId"
                  :options="tipo"
                  optionLabel="name"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  id="tipo-vehiculo"
                  placeholder="Tipo Vehiculo"
                />
                <RouterLink :to="{ name: 'listaTiposVehiculo' }">
                  <button class="hover:bg-blue-600 bg-blue-500 text-white">
                    ver
                  </button>
                </RouterLink>
              </div>
            </div>
            <div class="w-1/2">
              <div class="flex items-center space-x-2 mt-1">
                <Select
                  v-model="modeloVehiculo.marcaVehiculoId"
                  :options="marca"
                  optionLabel="name"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  id="marca-vehiculo"
                  placeholder="Marca vehiculo"
                />
                <RouterLink :to="{ name: 'marcasvehiculos' }">
                  <button class="hover:bg-blue-600 bg-blue-500 text-white">
                    ver
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-4 space-x-2">
            <RouterLink
              :to="{
                name: 'listaModelosVehiculo',
              }"
              ><button class="mx-1 hover:bg-green-600 bg-green-700 text-white">
                Editar un Modelo existente
              </button></RouterLink
            >
            <Toast />
            <button
              type="submit"
              @click="showToast()"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
