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
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
import Skeleton from "primevue/skeleton";
let nombre = ref("");

const ADD_MARCA_QUERY = gql`
 mutation newMarca($nombre: String!) {
    createCarMake(name: $nombre) {
     __typename
    }
  }
`;


const { mutate: data } = useMutation(ADD_MARCA_QUERY);
const newMarca = async () => {
  try {
    const response = await data({
      nombre: nombre.value,
    });

    router.push({ name: "marcasvehiculos" });
  } catch (error) {
    console.log(error);
  }
};


const showToast = () => {
  if (nombre.value.trim() === "" || nombre.value.length < 2) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un nombre valido para la categoria",
      life: 3000,
    });
  } else {
    newMarca();
  }
};

</script>

<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <h1 class="text-2xl font-semibold mb-6">Agregar una Marca</h1>
        <form @submit.prevent>
          <div class="flex justify-stretch gap-4">
            <div class="w-1/2">
              <div class="flex flex-col gap-2">
                <label for="username">Nombre</label>
                <InputText
                  id="username"
                  v-model="nombre"
                  aria-describedby="username-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  :invalid="nombre === ''"
                />
                <small id="username-help"
                  >Procura un nombre descriptivo y unico para la marca que
                  deseas agregar</small
                >
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">

            <Toast />
            <button
              @click="showToast()"
              type="submit"
              class="border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agregar
            </button>
            <RouterLink
              :to="{
                name: 'marcasvehiculos',
              }"
              ><button class="mx-1 hover:bg-red-700 bg-red-600 text-white">
                Volver
              </button></RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
