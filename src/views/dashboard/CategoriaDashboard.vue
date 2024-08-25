<script setup>
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const router = useRouter();
import Toast from "primevue/toast";
const toast = useToast();

const ADD_CATEGORY_QUERY = gql`
  mutation newCategory($nombre: String!, $descuento: Int) {
    createProductCategory(name: $nombre, discount: $descuento) {
      __typename
    }
  }
`;

let categoria = ref("");
let descuento = ref(0);
const { mutate: data } = useMutation(ADD_CATEGORY_QUERY);
const newCategory = async () => {
  try {
    const response = await data({
      nombre: categoria.value,
      descuento: descuento.value,
    });

    router.push({ name: "listaCategorias" });
  } catch (error) {
    console.log(error);
  }
};

const showToast = () => {
  if (categoria.value === "" || categoria.value.trim() === "" || categoria.value.length < 3) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un nombre valido para la categoria",
      life: 3000,
    });
  } else {
    newCategory();
  }
};
</script>
<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Nueva categoria</h1>
        <form @submit.prevent>
          <div class="flex justify-stretch gap-4">
            <div class="w-1/2">
              <div class="flex flex-col gap-2">
                <label for="username">Nombre de la categoria</label>
                <InputText
                  id="username"
                  v-model="categoria"
                  aria-describedby="username-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  :invalid="categoria === ''"
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
                  v-model="descuento"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <RouterLink
              :to="{
                name: 'listaCategorias',
              }"
              ><button class="mx-1 hover:bg-green-600 bg-green-700 text-white">
                Editar Categoria existente
              </button></RouterLink
            >
            <Toast />
            <button
              @click="showToast()"
              type="submit"
              class="border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
