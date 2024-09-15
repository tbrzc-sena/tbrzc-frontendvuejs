<script setup>
import HeaderAlternative from "../views/base/HeaderAlternative.vue";
import { useRoute } from "vue-router";
const route = useRoute();
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import Message from 'primevue/message';
const productId = route.params.id;
const decodedID = atob(productId).split(":")[1];
import { ref, onBeforeMount, computed } from "vue";
const GET_PRODUCT_BY_ID_QUERY = gql`
  query getProductById($id: ID!) {
    carpet(id: $id) {
      price
      imageLink
      inventoryItem {
        name
        stock
        type
        description
      }
      category {
        name
        discount
      }
      carModel {
        name
      }
    }
  }
`;

let producto = ref({
  precio: 0, //price
  imagen: "", //imageLink
  nombre: "", //itemName
  descripcion: "", //description
  cantidad: 0, //itemStock
  tipoArticulo: 0, //itemType
  modeloVehiculo: 0, //carModel
  //marcaVehiculo: 0,//modelMake
  categoria: 0, //category
  //tipoVehiculo: 0,//modelType
});

const { result, loading, error } = useQuery(GET_PRODUCT_BY_ID_QUERY, () => ({
  id: decodedID,
}));

onBeforeMount(() => {
  if (!loading.value && !error.value && result.value) {
    const productData = result.value.carpet;
    producto.value = {
      precio: productData.price,
      imagen: productData.imageLink,
      nombre: productData.inventoryItem.name,
      descripcion: productData.inventoryItem.description,
      cantidad: productData.inventoryItem.stock,
    };
  }
});

const imageComputed = computed(() => producto.value.imagen);
</script>
<template>
  <!--
  <div>
    <h1>/producto/{{ product.idProducto }}</h1>
    <ul>
      <li>{{ product }}</li>
      <RouterLink :to="{ name: 'updateproductoview', params: { id: product.idProducto } }">editar</RouterLink>
    </ul>
  </div>
  -->
  <div class="py-6">
    <div class="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="-mx-4 flex flex-col md:flex-row">
        <div class="border-2 border-solid border-sky-500 px-4 md:flex-1">
          <img :src="imageComputed" alt="" />
        </div>
        <div class="px-4 md:flex-1">
          <h2
            class="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl"
          >
            {{ producto.nombre }}
          </h2>

          <div class="my-4 flex items-center space-x-4">
            <div>
              <div class="flex rounded-lg bg-gray-100 px-3 py-2">
                <span class="mr-1 mt-1">$</span>
                <span class="text-3xl font-bold">{{ producto.precio }}</span>
              </div>
            </div>
            <!--
            <div class="flex-1">
              <p class="text-xl font-semibold text-sky-600">ahorre un {{product.categoria.descuentoCategoria}}%</p>
            </div>
            -->
          </div>
          <p class="text-gray-500">
            {{ producto.descripcion }}
          </p>
          <!--
          <div class="flex py-4 space-x-4">
            <div class="relative">
              <div
                class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold"
              >
                Qty
              </div>
              <select
                class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <button
              type="button"
              class="h-14 px-6 py-2 font-semibold rounded-xl bg-green-600 hover:bg-green-500 text-white"
            >
              Add to Cart
            </button>
          </div>
          -->
          <Message class="w-full h-16" severity="warn">Esta sección está siendo modificada o el contenido aún no ha sido agregado. Por favor, vuelve más tarde ❤️</Message>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
