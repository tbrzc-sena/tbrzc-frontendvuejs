<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

let modelosVehiculoLst = ref();
const MODELO_VEHICULO_QUERY = gql`
  query {
    carModels {
      edges {
        node {
          id
          name
          year
          type {
            name
          }
          make {
            name
          }
        }
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation modeloVehiculoDelete($id: ID!) {
    deleteCarModel(id: $id) {
      success
    }
  }
`;

const { result, loading, error, onResult } = useQuery(MODELO_VEHICULO_QUERY);

onResult((queryResult) => {
  modelosVehiculoLst.value = queryResult.data;
  modelosVehiculoLst.value = modelosVehiculoLst.value.carModels.edges.map(
    (tipoVehiculo) => tipoVehiculo.node
  );
});

const deleteModeloVehiculo = async (idf) => {};
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
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  año
                </th>

                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  tipo de vehiculo
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  marca
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
              <tr
                v-for="modeloVehiculo in modelosVehiculoLst"
                :key="modeloVehiculo.id"
              >
                <td class="align-middle">
                  <div>
                    <p>{{ modeloVehiculo.id }}</p>
                  </div>
                </td>

                <td class="align-middle">
                  {{ modeloVehiculo.name }}
                </td>
                <td class="align-middle">
                  <p>
                    {{ modeloVehiculo.year }}
                  </p>
                </td>
                <td class="align-middle">
                  <p>
                    {{ modeloVehiculo.type.name }}
                  </p>
                </td>
                <td class="align-middle">
                  <p>
                    {{ modeloVehiculo.make.name }}
                  </p>
                </td>
                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'modeloVehiculoUpdate',
                      params: { id: modeloVehiculo.id },
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
                    @click="deleteModeloVehiculo(modeloVehiculo.id)"
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
