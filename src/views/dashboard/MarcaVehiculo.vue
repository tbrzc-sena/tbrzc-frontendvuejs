<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useQuery } from "@vue/apollo-composable";
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
            <button
              class="hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
