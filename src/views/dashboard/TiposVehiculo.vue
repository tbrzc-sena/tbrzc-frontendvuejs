<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";

import { useQuery } from "@vue/apollo-composable";



let tipoVehiculoLst = ref();
const TIPO_VEHICULO_QUERY = gql`
  query{
  carTypes{
    edges{
      node{
        id
        name
      }
    }
  }
}
`;

const DELETE_MUTATION = gql`
  mutation tipoVehiculoDelete($id: ID!) {
    deleteCarType(id: $id) {
      success
    }
  }
`;

const { result, loading, error, onResult } = useQuery(TIPO_VEHICULO_QUERY);

onResult((queryResult) => {
  tipoVehiculoLst.value = queryResult.data;
  tipoVehiculoLst.value = tipoVehiculoLst.value.carTypes.edges.map(
    (tipoVehiculo) => tipoVehiculo.node
  );
});



const { mutate: data } = useMutation(DELETE_MUTATION);

const deleteTipoVehiculo = async (idf) => {
  let decodedID = atob(idf).split(":")[1]
  try {
    const response = await data({
      id: decodedID,
    });

    tipoVehiculoLst.value = tipoVehiculoLst.value.filter((tipoVehiculo) => tipoVehiculo.id !== idf);
  } catch (error) {
    console.log(error);
  }
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
            <button class="hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
          </div>
          <table class="">
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
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
              </tr>
            </thead>

            <tbody class="bg-gray-50">
              <tr v-for="tipoVehiculo in tipoVehiculoLst" :key="tipoVehiculo.id">
                <td class="align-middle">
                  <div>
                    <p>{{ tipoVehiculo.id }}</p>
                  </div>
                </td>

                <td class="align-middle">
                  {{ tipoVehiculo.name }}
                </td>
                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'tipoVehiculoUpdate',
                      params: { id: tipoVehiculo.id  },
                    }"
                    ><button
                      class="hover:bg-green-600 bg-green-700 font-bold text-white"
                    >
                      Editar
                    </button></RouterLink
                  >
                </td>
                <td class="align-middle">
                  <button
                    class="hover:bg-red-700 bg-red-500 font-bold text-white"
                    @click="deleteTipoVehiculo(tipoVehiculo.id)"
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
