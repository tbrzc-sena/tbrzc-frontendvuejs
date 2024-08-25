<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

import { onMounted, ref } from "vue";
import gql from "graphql-tag";
import { RouterLink } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Toast from "primevue/toast";

let marcaVehiculoLst = ref();

const MARCA_VEHICULO_QUERY = gql`
  query {
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

const DELETE_MUTATION = gql`
  mutation marcaVehiculoDelete($id: ID!) {
    deleteCarMake(id: $id) {
      success
    }
  }
`;
const { result, loading, error, onResult, refetch } =
  useQuery(MARCA_VEHICULO_QUERY);

onResult((queryResult) => {
  marcaVehiculoLst.value = queryResult.data.carMakes.edges.map(
    (edge) => edge.node
  );
});

onMounted(() => {
  refetch();
});

const { mutate: data } = useMutation(DELETE_MUTATION);

const deleteModeloVehiculo = async (idf) => {
  let decodedID = atob(idf).split(":")[1];
  try {
    const response = await data({
      id: decodedID,
    });

    marcaVehiculoLst.value = marcaVehiculoLst.value.filter(
      (marca) => marca.id !== idf
    );
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo eliminar la Marca",
      life: 2000,
    });
  }
};

const showToast = (idf) => {
  toast.add({
    severity: "success",
    summary: "La Marca ha sido eliminada",
    detail: "Se ha eliminado con exito la Marca",
    life: 2000,
  });
  deleteModeloVehiculo(idf);
};
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


            <RouterLink
                      :to="{
                        name: 'newMarcaVehiculo'
                      }"
                      ><button
              class="hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Agregar
            </button></RouterLink
                    >
          </div>
          <div v-if="loading">
            <p>loading...</p>
          </div>
            <table class="" v-else>
              <thead class="">
                <tr>
                  <th
                    class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                  >
                    id
                  </th>

                  <th
                    class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                  >
                    nombre
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody class="bg-gray-50">
                <tr
                  v-for="marcaVehiculo in marcaVehiculoLst"
                  :key="marcaVehiculo.id"
                >
                  <td class="align-middle">
                    <div>
                      <p>{{ marcaVehiculo.id }}</p>
                    </div>
                  </td>

                  <td class="align-middle">
                    {{ marcaVehiculo.name }}
                  </td>

                  <td class="align-middle">
                    <RouterLink
                      :to="{
                        name: 'marcaloUpdate',
                        params: { id: marcaVehiculo.id },
                      }"
                      ><button
                        class="hover:bg-green-600 bg-green-700 text-white"
                      >
                        Editar
                      </button></RouterLink
                    >
                  </td>
                  <td class="align-middle">
                    <Toast />
                    <button
                      class="hover:bg-red-700 bg-red-600 text-white"
                      @click="showToast(marcaVehiculo.id)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </main>
  </div>
</template>
