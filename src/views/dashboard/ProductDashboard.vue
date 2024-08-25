<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import { ref, onMounted } from "vue";
import gql from "graphql-tag";
import { RouterLink } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
let productsLst = ref();
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const FORM_DATA = gql`
  query{
  products {
    edges {
      node {
        id
        inventoryItem {
          name
          status
          type
          stock
        }
        category {
          discount
        }
        price
      }
    }
  }
}
`;

const DELETE_MUTATION = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
    }
  }
`;
const deleteProduct = async (idf) => {
  let decodedID = atob(idf).split(":")[1]
  try {
    const response = await data({
      id: decodedID,
    });

    productsLst.value = productsLst.value.filter((product) => product.id !== idf);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo eliminar el producto",
      life: 2000,
    });
  }
};


const { result, loading, error, refetch,onResult } = useQuery(FORM_DATA);

onResult((queryResult) => {
  productsLst.value = queryResult.data.products.edges.map((product) => product.node);
});

onMounted(() => {
  refetch();
});

const { mutate: data } = useMutation(DELETE_MUTATION);


const showToast = (idf) => {
  toast.add({
    severity: "success",
    summary: "Categoria eliminada",
    detail: "La categoria ha sido eliminada con exito",
    life: 2000,
  });
  deleteProduct(idf);
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
        <div v-if="loading">Loading...</div>

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
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  estado
                </th>

                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  descuento
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  tipo
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  cantidad
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  precio
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
              </tr>
            </thead>


            <tbody class="bg-gray-50">
              <tr v-for="product in productsLst" :key="product.id">
                <td class="align-middle">
                  <div>
                    <p>{{ product.id }}</p>
                  </div>
                </td>

                <td class="align-middle">
                  {{ product.inventoryItem.name }}
                </td>
                <td class="align-middle">
                  <button
                    class="hover:bg-green-600 bg-green-600 font-bold text-white rounded-full"
                  >
                    {{ product.inventoryItem.status }}
                  </button>
                </td>

                <td class="align-middle text-green-600 font-bold">
                  {{ product.category.discount }}%
                </td>
                <td class="align-middle">
                  {{ product.inventoryItem.type }}
                </td>
                <td class="align-middle">
                  <button
                    class="hover:bg-orange-500 bg-orange-500 font-bold text-white rounded-full"
                  >
                    {{ product.inventoryItem.stock }}
                  </button>
                </td>
                <td class="align-middle font-bold">
                  {{ product.price }}
                </td>
                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'updateproductoview',
                      params: { id: product.id  },
                    }"
                    ><button
                      class="hover:bg-green-600 bg-green-700 font-bold text-white"
                    >
                      Editar
                    </button></RouterLink
                  >
                </td>
                <td class="align-middle">
                  <Toast />
                  <button
                    class="hover:bg-red-700 bg-red-500 font-bold text-white"
                    @click="showToast(product.id)"
                  >
                    Eliminar
                  </button>
                </td>
                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'productoview',
                      params: { id: product.id },
                    }"
                    ><button
                      class="hover:bg-blue-500 bg-blue-700 font-bold text-white"
                    >
                      Ver
                    </button></RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
