<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

import { ref } from "vue";
import gql from "graphql-tag";
import { RouterLink } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
let categoriaLst = ref();
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Toast from "primevue/toast";

const CATEGORIAS_QUERY = gql`
  query {
    productCategories {
      edges {
        node {
          id
          name
          discount
        }
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation categoryUpdate($id: ID!) {
    deleteProductCategory(id: $id) {
      success
    }
  }
`;

const { result, loading, error, onResult } = useQuery(CATEGORIAS_QUERY);

onResult((queryResult) => {
  categoriaLst.value = queryResult.data;
  categoriaLst.value = categoriaLst.value.productCategories.edges.map(
    (categoria) => categoria.node
  );
});



const { mutate: data } = useMutation(DELETE_MUTATION);

const deleteCategoria = async (idf) => {
  let decodedID = atob(idf).split(":")[1]
  try {
    const response = await data({
      id: decodedID,
    });

    categoriaLst.value = categoriaLst.value.filter((product) => product.id !== idf);
  } catch (error) {
    console.log(error);
  }
};

const showToast = (idf) => {
  toast.add({
    severity: "success",
    summary: "Categoria eliminada",
    detail: "La categoria ha sido eliminada con exito",
    life: 2000,
  });
  deleteCategoria(idf);
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
                  descuento
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody class="bg-gray-50">
              <tr v-for="categoria in categoriaLst" :key="categoria.id">
                <td class="align-middle">
                  <div>
                    <p>{{ categoria.id }}</p>
                  </div>
                </td>

                <td class="align-middle">
                  {{ categoria.name }}
                </td>
                <td class="align-middle">
                  <p class="">
                    {{ categoria.discount }}
                  </p>
                </td>

                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'categoriaupdate',
                      params: { id: categoria.id },
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
                    @click="showToast(categoria.id)"
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
