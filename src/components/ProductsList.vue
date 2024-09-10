<script setup>
import { ref, watch } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";



const GET_PRODUCTS = gql`
  query MyQuery {
    carpets {
      edges {
        node {
          carModel {
            name
            make {
              name
            }
            year
          }
          category {
            discount
            name
          }
          imageLink
          price
          inventoryItem {
            description
            name
            stock
            status
            type
          }
          id
        }
      }
    }
  }
`;

let products = ref();
const { result, loading, error } = useQuery(GET_PRODUCTS);

watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      products.value = result.value.carpets.edges;
    }
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <!-- Este es un comentario en un template de Vue.js
    <ul v-for="product in products" :key="product.idProducto">
      <li>
        {{ product }}
        <RouterLink :to="{ name: 'productoview', params: { id: product.idProducto } }">ver</RouterLink>
        <button @click="deleteProduct(product.idProducto)">Eliminar</button>
      </li>
    </ul>
    <RouterLink :to="{ name: 'addproductoview' }">añadir</RouterLink>
  -->

    <main class="m-10">
      <section>
        <div class="w-10/12 mx-auto">
          <div class="grid grid-cols-3">
            <!-- COMPONENT-->
            <div class="flex" v-for="product in products" :key="product.node.id">
              <div
                class="flex flex-col w-3/4 justify-between flex-grow m-4 rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1"
              >
                <RouterLink
                  :to="{
                    name: 'productoview',
                    params: { id: product.node.id },
                  }"
                >
                  <img
                    class="rounded-t-lg w-100"
                    :src="product.node.imageLink"
                    :alt="product.node.inventoryItem.name"
                  />
                </RouterLink>
                <div class="flex flex-col m-4 ">
                  <RouterLink
                    :to="{
                      name: 'productoview',
                      params: { id: product.node.id },
                    }"
                  >
                    <p class="font-semibold text-gray-900">
                      {{ product.node.inventoryItem.name }}
                    </p>
                  </RouterLink>



                  <div>
                    <div class="flex items-center justify-between">
                      <span class="font-bold">${{ product.node.price }}</span>
                      <span class="text-green-400 font-bold"
                        >{{ product.node.category.discount }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<style scoped lang="scss">


</style>
