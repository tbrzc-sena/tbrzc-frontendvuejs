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
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
import Skeleton from "primevue/skeleton";

let modeloVehiculo = ref({
  id: "",
  nombre: "",
  year: 0,
  tipoVehiculoId: "",
  marcaVehiculoId: "",
});

let tipo = ref();
let marca = ref();

let modeloVehiculoId = ref(route.params.id);
let decodedID = computed(() => atob(modeloVehiculoId.value).split(":")[1]);

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

const GET_MODELO_BY_ID_QUERY = gql`
  query getModeloVehiculoById($id: ID!) {
  carModel(id: $id) {
    id
    name
    year
    type {
      id
      name
    }
    make {
      id
      name
    }
  }
}
`;


const UPDATE_MODELO_MUTATION = gql`
  mutation updateModeloVehiculo($id: ID!, $nombre: String!, $year: Int!, $tipoVehiculoId: ID!, $marcaVehiculoId: ID!) {
  updateCarModel(
    id: $id
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

const {
  result: infoResult,
  loading: infoLoading,
  error: infoError,
} = useQuery(TIPO_MODELO_QUERY);

const { result, loading, error } = useQuery(GET_MODELO_BY_ID_QUERY, () => ({
  id: decodedID.value,
}));

const loadModeloVehiculoData = () => {
  watch(
    [infoResult, infoLoading, infoError],
    () => {
      if (!infoLoading.value && !infoError.value && infoResult.value) {
        tipo.value = infoResult.value.carTypes.edges.map(
          (edge) => edge.node
        );
        marca.value = infoResult.value.carMakes.edges.map(
          (edge) => edge.node
        );
      }
    },
    { immediate: true }
  );
  watch(
    [result, loading, error],
    () => {
      if (!loading.value && !error.value && result.value) {
        const productData = result.value.carModel;
        modeloVehiculo.value = {
          id: decodedID.value,
          nombre: productData.name,
          year: productData.year,
          tipoVehiculoId: productData.type.id,
          marcaVehiculoId: productData.make.id,
        };

        modeloVehiculo.value.marcaVehiculoId = marca.value.find(
          (marca) => marca.id === productData.make.id
        );
        modeloVehiculo.value.tipoVehiculoId = tipo.value.find(
          (tipo) => tipo.id === productData.type.id
        );
      }
    },
    { immediate: true }
  );

};

watch(
  () => route.params.id,
  (newId) => {
    modeloVehiculoId.value = newId;
    loadModeloVehiculoData();
  },
  { immediate: true }
);


const { mutate } = useMutation(UPDATE_MODELO_MUTATION);
const updateModeloVehiculo = async () => {

  try {
    const response = await mutate({
      id: modeloVehiculo.value.id,
      nombre: modeloVehiculo.value.nombre,
      year: modeloVehiculo.value.year,
      tipoVehiculoId:  atob(modeloVehiculo.value.tipoVehiculoId.id).split(":")[1],
      marcaVehiculoId: atob(modeloVehiculo.value.marcaVehiculoId.id).split(":")[1],
    });
    router.push({ name: "listaModelosVehiculo" });

  } catch (error) {
    console.log(error);

  }
};

const showToast = () => {
  updateModeloVehiculo();
};
</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Actualizar Modelo Vehiculo</h1>
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

            <Toast />
            <button
              type="submit"
              @click="showToast()"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar Modelo
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
