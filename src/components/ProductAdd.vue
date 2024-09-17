<script setup lang="ts">
import DashboardHeader from "../views/dashboard/DashboardHeader.vue";
import DashboardAside from "../views/dashboard/DashboardAside.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
const router = useRouter();
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";

const toast = useToast();

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
  inventoryItems(type: "RAW") {
    edges {
      node {
        type
        name
        id
      }
    }
  }
}
`;
const ADD_PRODUCT_QUERY = gql`
  mutation addProduct(
    $imagen: String!
    $precio: Int!
    $nombre: String!
    $cantidad: Int!
    $tipoArticulo: String!
    $descripcion: String!
    $categoria: ID!
    $modeloVehiculo: ID!
    $materialID: ID!
  ) {
    createCarpet(
      imageLink: $imagen
      price: $precio
      itemName: $nombre
      itemStock: $cantidad
      itemType: $tipoArticulo
      itemDescription: $descripcion
      categoryId: $categoria
      carModelId: $modeloVehiculo
      materialId: $materialID
    ) {
      carpet {
        inventoryItem {
          name
        }
      }
    }
  }
`;

let categoria = ref();
let tipo = ref(["Material", "Tapete", "Personalizado"]);
let modelo = ref();
let material = ref();

let producto = ref({
  precio: 0, //price
  imagen: "", //imageLink
  nombre: "", //itemName
  descripcion: "", //description
  cantidad: 0, //itemStock
  tipoArticulo: "", //itemType
  modeloVehiculo: 0, //carModel
  //marcaVehiculo: 0,//modelMake
  categoria: 0, //category
  //tipoVehiculo: 0,//modelType
  material: 0,
});

const isValidURL = (string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(string);
};

const { result, loading, error } = useQuery(INFO_PRODUCT_QUERY);
watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      categoria.value = result.value.productCategories.edges.map(
        (edge) => edge.node
      );
      modelo.value = result.value.carModels.edges.map((edge) => edge.node);
      material.value = result.value.inventoryItems.edges.map(
        (edge) => edge.node
      );
    }
  },
  { immediate: true }
);

const { mutate: data } = useMutation(ADD_PRODUCT_QUERY);
const newProduct = async () => {
  try {
    let selectedTipo = producto.value.tipoArticulo;
    if (selectedTipo === "Material") {
      producto.value.tipoArticulo = "RAW";
    } else if (selectedTipo === "Tapete") {
      producto.value.tipoArticulo = "MAT";
    } else if (selectedTipo === "Personalizado") {
      producto.value.tipoArticulo = "CUS";
    }
    const response = await data({
      imagen: producto.value.imagen,
      precio: producto.value.precio,
      nombre: producto.value.nombre,
      cantidad: producto.value.cantidad,
      tipoArticulo: producto.value.tipoArticulo,
      descripcion: producto.value.descripcion,

      categoria: atob(producto.value.categoria.id).split(":")[1],
      modeloVehiculo: atob(producto.value.modeloVehiculo.id).split(":")[1],
      // aqui id material
      materialID: atob(producto.value.material.id).split(":")[1],
    });
    router.push({ name: "productdashboard" });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El nombre del producto ya existe!!",
      life: 3000,
    });
  }
};

const showToast = () => {
  if (
    !isValidURL(producto.value.imagen) ||
    producto.value.imagen.length > 255
  ) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "La URL de la imagen no es válida",
      life: 3000,
    });
  } else {
    if (producto.value.precio <= 0 || producto.value.cantidad <= 0) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "El precio o la cantidad no pueden ser menores o iguales a 0",
        life: 3000,
      });
    } else if (
      producto.value.nombre === "" ||
      producto.value.descripcion === "" ||
      producto.value.tipoArticulo === "" ||
      producto.value.categoria === 0 ||
      producto.value.modeloVehiculo === 0
    ) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Todos los campos son obligatorios",
        life: 3000,
      });
    } else {
      newProduct();
    }
  }
};
const imageComputed = computed(() => producto.value.imagen);
</script>
<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <div
          class="absolute top-0 right-0 mt-4 mr-4 w-40 h-40 border border-solid border-sky-700 rounded-lg shadow-md"
        >
          <img
            :src="imageComputed"
            alt="ingrese la url de la imagen"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h1 class="text-2xl font-semibold mb-6">Nuevo producto</h1>
        <form @submit.prevent class="space-y-6">
          <div>
            <label
              for="nombre-articulo"
              class="block text-sm font-medium text-gray-700"
              >Nombre articulo</label
            >
            <InputText
              type="text"
              v-model="producto.nombre"
              id="nombre-articulo"
              class="w-2/3 border-gray-300 rounded-md shadow-sm"
              :invalid="producto.nombre === ''"
            />
          </div>
          <div>
            <label
              for="descripcion"
              class="block text-sm font-medium text-gray-700"
              >Descripcion</label
            >
            <Textarea
              v-model="producto.descripcion"
              id="descripcion"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm resize-none"
              rows="5"
              cols="30"
              :invalid="producto.descripcion === ''"
            />
          </div>
          <div class="flex space-x-4">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700"
                >Precio</label
              >
              <InputNumber
                v-model="producto.precio"
                inputId="integeronly"
                suffix="COP"
                id="price"
                :min="1000"
                :max="2000000"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                for="cantidad"
                class="block text-sm font-medium text-gray-700"
                >Cantidad</label
              >
              <InputNumber
                v-model="producto.cantidad"
                inputId="minmax"
                :min="0"
                :max="100"
                id="cantidad"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="imagen-producto"
              class="block text-sm font-medium text-gray-700"
              >Imagen</label
            >
            <Textarea
              v-model="producto.imagen"
              id="imagen-producto"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm resize-none"
              rows="5"
              cols="30"
              :invalid="producto.imagen === ''"
            />
          </div>
          <div v-if="loading">
            <Skeleton width="10rem" height="4rem"></Skeleton>
          </div>
          <div class="flex space-x-4" v-else>
            <div class="w-1/2">
              <label
                for="categoria-vehiculo"
                class="block text-sm font-medium text-gray-700"
                >Categoria</label
              >
              <Select
                v-model="producto.categoria"
                :options="categoria"
                optionLabel="name"
                placeholder="Categoria producto"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                id="categoria-vehiculo"
              />
              <p class="mt-1 text-sm text-green-500">
                Descuento! {{ producto.categoria.discount }}%
              </p>
            </div>

            <div class="w-1/2">
              <label
                for="tipo-articulo"
                class="block text-sm font-medium text-gray-700"
                >Tipo articulo</label
              >
              <Select
                v-model="producto.tipoArticulo"
                :options="tipo"
                placeholder="Tipo de articulo"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                id="tipo-articulo"
              />
            </div>
            <div class="w-1/2">
              <label
                for="modelo-vehiculo"
                class="block text-sm font-medium text-gray-700"
                >Modelo vehiculo</label
              >
              <Select
                v-model="producto.modeloVehiculo"
                :options="modelo"
                optionLabel="name"
                placeholder="Modelo vehiculo"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                id="modelo-vehiculo"
              />
            </div>
          </div>
          <div class="w-full">
              <label
                for="material-tapete"
                class="block text-sm font-medium text-gray-700"
                >Material</label
              >
              <Select
                v-model="producto.material"
                :options="material"
                optionLabel="name"
                placeholder="Material Tapete"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                id="material-tapete"
              />
            </div>
          <div>
            <Toast />
            <button
              @click="showToast()"
              type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
