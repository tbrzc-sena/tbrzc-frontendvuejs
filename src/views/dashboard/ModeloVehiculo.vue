<script setup>
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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

let tipo = ref([]);
let marca = ref([]);
let modeloVehiculo = ref({
  nombre: "",
  year: 0,
  tipoVehiculoId: "",
  marcaVehiculoId: "",
});

const newModeloVehiculo = async () => {};
</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Nuevo modelo vehiculo</h1>
        <form @submit.prevent="newModeloVehiculo()" class="space-y-6">
          <div class="flex space-x-4">
            <div class="w-2/3">
            <label
              for="nombre-modelo"
              class="block  text-sm font-medium text-gray-700"
              >Nombre del modelo</label
            >
            <InputText
              type="text"
              v-model="modeloVehiculo.nombre"
              id="nombre-modelo"
              class="w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
              <label
                for="año"
                class="block text-sm font-medium text-gray-700"
                >Añó</label
              >
              <InputNumber
                v-model="modeloVehiculo.year"
                inputId="minmax"
                :min="1500"
                :max="2024"
                id="año"
                class=" border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>


          <div class="flex space-x-4">
  <div class="w-1/2">
    <label for="tipo-vehiculo" class="block text-sm font-medium text-gray-700">Tipo Vehiculo</label>
    <div class="flex items-center space-x-2 mt-1">
      <Select
        v-model="tipo"
        optionLabel="name"
        placeholder="Tipo Vehiculo"
        class="w-full border-gray-300 rounded-md shadow-sm"
        id="tipo-vehiculo"
      />
      <RouterLink :to="{ name: 'listaCategorias' }">
        <button class="hover:bg-blue-600 bg-blue-500 text-white">ver</button>
      </RouterLink>
    </div>
  </div>
  <div class="w-1/2">
    <label for="marca-vehiculo" class="block text-sm font-medium text-gray-700">Modelo vehiculo</label>
    <div class="flex items-center space-x-2 mt-1">
      <Select
        v-model="marca"
        optionLabel="name"
        placeholder="Marca Vehiculo"
        class="w-full border-gray-300 rounded-md shadow-sm"
        id="marca-vehiculo"
      />
      <RouterLink :to="{ name: 'listaModelosVehiculo' }">
        <button class="hover:bg-blue-600 bg-blue-500 text-white">ver</button>
      </RouterLink>
    </div>
  </div>
</div>

          <div>
            <button
              type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
