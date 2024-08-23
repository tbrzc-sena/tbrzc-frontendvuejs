<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from "vue-router";
const route = useRoute();

import Skeleton from "primevue/skeleton";

let categoriaId = ref(route.params.id);
let decodedID = computed(() => atob(categoriaId.value).split(":")[1]);

const GET_CATEGORY_BY_ID_QUERY = gql`
  query getProductById($id: ID!) {
  productCategory(id: $id) {
    id
    name
    discount
  }
}
`;

let categoria = ref({
  id: "",
  nombre: "",
  descuento: 0,
});

const { result, loading, error } = useQuery(GET_CATEGORY_BY_ID_QUERY, () => ({
  id: decodedID.value,
}));

const loadCategoryData = () => {
  watch(
    [result, loading, error],
    () => {
      if (!loading.value && !error.value && result.value) {
        categoria.value.id = decodedID.value;
        categoria.value.nombre = result.value.productCategory.name;
        categoria.value.descuento = result.value.productCategory.discount;
      }
    },
    { immediate: true }
  );
};

watch(
  () => route.params.id,
  (newId) => {
    categoriaId.value = newId;
    loadCategoryData();
  },
  { immediate: true }
);

const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateCategoriaMutation($id: ID!, $descuento: Int, $nombre: String!) {
  updateProductCategory(id: $id, discount: $descuento, name: $nombre) {
    productCategory {
      name
    }
  }
}
`;


const { mutate } = useMutation(UPDATE_CATEGORY_MUTATION);
const updateCategory = async () => {
  try {
    const response = await mutate({
      id: categoria.value.id,
      nombre: categoria.value.nombre,
      descuento: categoria.value.descuento,
    });
    router.push({ name: "listaCategorias" });
  } catch (error) {
    console.log(error);
  }
};


</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Actualizar categoria</h1>
        <form @submit.prevent="updateCategory()">
          <div class="flex justify-stretch gap-4">
            <div class="w-1/2">
              <div class="flex flex-col gap-2">
                <label for="username">Nombre de la categoria</label>
                <InputText
                  id="username"
                  v-model="categoria.nombre"
                  aria-describedby="username-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                />
                <small id="username-help"
                  >Procura un nombre descriptivo y unico para la categoria que
                  deseas agregar</small
                >
              </div>
            </div>
            <div class="w-1/2">
              <div class="flex flex-col gap-2">
                <label for="descuento">Descuento categoria</label>
                <InputNumber
                  inputId="minmax"
                  :min="0"
                  :max="100"
                  id="descuento"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  v-model="categoria.descuento"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">




            <button
              type="submit"
              class="border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar
            </button>
            <RouterLink
                    :to="{
                      name: 'listaCategorias',
                    }"
                    ><button class="mx-1 hover:bg-red-700 bg-red-600  text-white">Volver</button></RouterLink
                  >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
