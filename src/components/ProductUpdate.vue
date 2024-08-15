<script setup lang="ts">
import DashboardHeader from "../views/dashboard/DashboardHeader.vue";
import DashboardAside from "../views/dashboard/DashboardAside.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, onBeforeMount } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from 'vue-router';
const route = useRoute();
const productId = route.params.id
const decodedID = atob(productId).split(":")[1]

let categoria = ref();
let tipo = ref(["MAT", "RAW", "CUS"]);
let modelo = ref();

const INFO_PRODUCT_QUERY = gql`
  query InfoForProductCreation {
    carModels {
      edges {
        node {
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
    }
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

let producto = ref({
  precio: 0, //price
  imagen: "", //imageLink
  nombre: "", //itemName
  descripcion: "", //description
  cantidad: 0, //itemStock
  //tipoArticulo: 0, //itemType
  //modeloVehiculo: 0, //carModel
  //marcaVehiculo: 0,//modelMake
  //categoria: 0, //category
  //tipoVehiculo: 0,//modelType
});

const UPDATE_PRODUCT_MUTATION = gql`mutation updateProductMutation($id: ID!, $modeloVehiculo: ID!, $categoria: ID!, $imagen: String!, $descripcion: String!, $nombre: String!, $cantidad: Int!, $tipoArticulo: String!, $precio: Int!) {
  updateProduct(
    id: $id
    carModelId: $modeloVehiculo
    categoryId: $categoria
    imageLink: $imagen
    itemDescription: $descripcion
    itemName: $nombre
    itemStock: $cantidad
    itemType: $tipoArticulo
    price: $precio
  ) {
    product {
      inventoryItem {
        name
      }
    }
  }
}
`;


const GET_PRODUCT_BY_ID_QUERY = gql`query getProductById($id:ID!) {
  product(id: $id) {
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
}`;

const { result, loading, error } = useQuery(GET_PRODUCT_BY_ID_QUERY, () => ({ id: decodedID }));

onBeforeMount(() => {
  if (!loading.value && !error.value && result.value) {
    const productData = result.value.product;
    producto.value = {
      precio: productData.price,
      imagen: productData.imageLink,
      nombre: productData.inventoryItem.name,
      descripcion: productData.inventoryItem.description,
      cantidad: productData.inventoryItem.stock,
    };
  }

})


const updateProduct = async () => {


}


const imageComputed = computed(() => producto.value.imagen);
</script>


<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <div class="absolute top-0 right-0 mt-4 mr-4 w-40 h-40 border border-solid border-sky-700 rounded-lg shadow-md">
          <img :src="imageComputed" alt="Imagen" class="w-full h-full object-cover rounded-lg" />
        </div>
        <h1 class="text-2xl font-semibold mb-6">Actualizar producto</h1>
        <form @submit.prevent="updateProduct()" class="space-y-6">
          <div>
            <label for="nombre-articulo" class="block text-sm font-medium text-gray-700">Nombre articulo</label>
            <InputText type="text" v-model="producto.nombre" id="nombre-articulo"
              class="w-2/3 border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripcion</label>
            <Textarea v-model="producto.descripcion" id="descripcion"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm" autoResize />
          </div>
          <div class="flex space-x-4">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
              <InputNumber v-model="producto.precio" inputId="integeronly" suffix="COP" id="price"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label for="cantidad" class="block text-sm font-medium text-gray-700">Cantidad</label>
              <InputNumber v-model="producto.cantidad" inputId="minmax" :min="0" :max="100" id="cantidad"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>

          <div>
            <label for="imagen-producto" class="block text-sm font-medium text-gray-700">Imagen</label>
            <Textarea v-model="producto.imagen" id="imagen-producto"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm" autoResize />
          </div>
          <!--
          <div class="flex space-x-4">
            <div class="w-1/2">
              <label for="categoria-vehiculo" class="block text-sm font-medium text-gray-700">Categoria</label>
              <Select v-model="producto.categoria" :options="categoria" optionLabel="name"
                placeholder="Categoria producto" class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                id="categoria-vehiculo" />
              <p class="mt-1 text-sm text-green-500">
                Descuento! {{ producto.categoria.discount }}%
              </p>
            </div>

            <div class="w-1/2">
              <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Tipo articulo</label>
              <Select v-model="producto.tipoArticulo" :options="tipo" placeholder="Tipo de articulo"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm" id="tipo-articulo" />
            </div>
            <div class="w-1/2">
              <label for="modelo-vehiculo" class="block text-sm font-medium text-gray-700">Modelo vehiculo</label>
              <Select v-model="producto.modeloVehiculo" :options="modelo" optionLabel="name"
                placeholder="Modelo vehiculo" class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                id="modelo-vehiculo" />
            </div>
          </div>
        -->
          <div>
            <button type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
