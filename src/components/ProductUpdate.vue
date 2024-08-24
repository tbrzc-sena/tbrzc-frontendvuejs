<script setup lang="ts">
import DashboardHeader from "../views/dashboard/DashboardHeader.vue";
import DashboardAside from "../views/dashboard/DashboardAside.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from "vue-router";
const route = useRoute();
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
import Skeleton from "primevue/skeleton";

let productId = ref(route.params.id);
let decodedID = computed(() => atob(productId.value).split(":")[1]);

let categoria = ref();
let tipo = ref(["Material", "Tapete", "Orden Personalizada"]);

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

const {
  result: infoResult,
  loading: infoLoading,
  error: infoError,
} = useQuery(INFO_PRODUCT_QUERY);

let producto = ref({
  id: "",
  precio: 0, //price
  imagen: "", //imageLink
  nombre: "", //itemName
  descripcion: "", //description
  cantidad: 0, //itemStock
  tipoArticulo: "", //itemType
  modeloVehiculo: "", //carModel
  //marcaVehiculo: 0,//modelMake
  categoria: "", //category
  //tipoVehiculo: 0,//modelType
});

const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProductMutation(
    $id: ID!
    $modeloVehiculo: ID!
    $categoria: ID!
    $imagen: String!
    $descripcion: String!
    $nombre: String!
    $cantidad: Int!
    $tipoArticulo: String!
    $precio: Int!
  ) {
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

const GET_PRODUCT_BY_ID_QUERY = gql`
  query getProductById($id: ID!) {
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
        id
        name
        discount
      }
      carModel {
        id
        name
      }
    }
  }
`;

const { result, loading, error } = useQuery(GET_PRODUCT_BY_ID_QUERY, () => ({
  id: decodedID.value,
}));

const loadProductData = () => {
  watch(
    [infoResult, infoLoading, infoError],
    () => {
      if (!infoLoading.value && !infoError.value && infoResult.value) {
        categoria.value = infoResult.value.productCategories.edges.map(
          (edge) => edge.node
        );
        modelo.value = infoResult.value.carModels.edges.map(
          (edge) => edge.node
        );
      }
    },
    { immediate: true }
  );
  watch(
    [result, loading, error],
    () => {
      if (!loading.value && !error.value && result.value) {
        const productData = result.value.product;
        producto.value = {
          id: decodedID.value,
          precio: productData.price,
          imagen: productData.imageLink,
          nombre: productData.inventoryItem.name,
          descripcion: productData.inventoryItem.description,
          cantidad: productData.inventoryItem.stock,
          tipoArticulo: productData.inventoryItem.type, //
          modeloVehiculo: productData.carModel.id, //id
          categoria: productData.category.id, //id
        };
        //deberia comentar hehe

        producto.value.categoria = categoria.value.find(
          (cat) => cat.id === productData.category.id
        );
        producto.value.modeloVehiculo = modelo.value.find(
          (mod) => mod.id === productData.carModel.id
        );
      }
    },
    { immediate: true }
  );
};

watch(
  () => route.params.id,
  (newId) => {
    productId.value = newId;
    loadProductData();
  },
  { immediate: true }
);

const { mutate } = useMutation(UPDATE_PRODUCT_MUTATION);
const updateProduct = async () => {
  try {
    let selectedTipo = producto.value.tipoArticulo;
    if (selectedTipo === "Material") {
      producto.value.tipoArticulo = "RAW";
    } else if (selectedTipo === "Tapete") {
      producto.value.tipoArticulo = "MAT";
    } else if (selectedTipo === "Orden Personalizada") {
      producto.value.tipoArticulo = "CUS";
    }
    const response = await mutate({
      id: producto.value.id,
      modeloVehiculo: atob(producto.value.modeloVehiculo.id).split(":")[1],
      categoria: atob(producto.value.categoria.id).split(":")[1],
      imagen: producto.value.imagen,
      descripcion: producto.value.descripcion,
      nombre: producto.value.nombre,
      cantidad: producto.value.cantidad,
      tipoArticulo: producto.value.tipoArticulo,
      precio: producto.value.precio,
    });
    router.push({ name: "productdashboard" });
  } catch (error) {
    console.log(error);
  }
};


const isValidURL = (string) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(string);
};

const imageComputed = computed(() => producto.value.imagen);

const showToast = () => {
  if (!isValidURL(producto.value.imagen)) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'La URL de la imagen no es válida', life: 3000 });
  }else{
    if(producto.value.precio <= 0 || producto.value.cantidad <= 0){
      toast.add({ severity: 'error', summary: 'Error', detail: 'El precio o la cantidad no pueden ser menores o iguales a 0', life: 3000 })
    }else if(producto.value.nombre === "" || producto.value.descripcion === "" || producto.value.tipoArticulo === "" || producto.value.categoria === 0 || producto.value.modeloVehiculo === 0){
      toast.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios', life: 3000 })
    }else{
      updateProduct();
    }
  }
};
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
            alt="ingrese el url de la imagen"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h1 class="text-2xl font-semibold mb-6">Actualizar producto</h1>
        <div v-if="loading">
          <Skeleton ></Skeleton>
          <Skeleton width="7rem" ></Skeleton>
          <Skeleton width="5rem" ></Skeleton>
          <Skeleton height="2rem" ></Skeleton>
          <Skeleton width="7rem" height="4rem"></Skeleton>
        </div>
        <form v-else @submit.prevent class="space-y-6">
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
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              autoResize
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
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="flex space-x-4">
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

          <div>
            <Toast />
            <button
              type="submit"
              @click="showToast()"
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
