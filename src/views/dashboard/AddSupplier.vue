<script setup lang="ts">
import DashboardAside from './DashboardAside.vue';
import DashboardHeader from './DashboardHeader.vue';
import gql from "graphql-tag";
import { RouterLink } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const router = useRouter();
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";


const toast = useToast();

const INFO_NEIGHBORHOODS = gql`
query NeighborhoodsList {
  neighborhoods {
    edges {
      node {
        id
        name
      }
    }
  }
}
`;

const ADD_SUPPLIER = gql`
mutation AddSupplier(
  $address: String!
  $email: String!
  $name: String!
  $neighborhood: ID!
  $phone: String!

) {
  createSupplier(
    addressDetails: $address
    email: $email
    name: $name
    neighborhoodId: $neighborhood
    phone: $phone
  ) {
    supplier {
      name
    }
  }
}
`;

let neighborhoods = ref();

let supplier = ref({
  address: "",
  email: "",
  name: "",
  phone: "",
  neighborhood: 0,
})

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

const { result, loading, error } = useQuery(INFO_NEIGHBORHOODS);
watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      neighborhoods.value = result.value.neighborhoods.edges.map(
        (edge) => edge.node
      );
    }
  },
  { immediate: true }
);

const { mutate: data } = useMutation(ADD_SUPPLIER);
const newSupplier = async () => {
  try {
    const response = await data({
      name: supplier.value.name,
      email: supplier.value.email,
      phone: supplier.value.phone,
      address: supplier.value.address,
      neighborhood: atob(supplier.value.neighborhood.id).split(":")[1],
    });
    router.push({ name: "proveedores" });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "nose error",
      life: 3000,
    });
  }
};

const showToast = () => {
    if (
      supplier.value.name === "" ||
      supplier.value.email === "" ||
      supplier.value.phone === "" ||
      supplier.value.address === "" ||
      supplier.value.neighborhood === 0
    ) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Todos los campos son obligatorios",
        life: 3000,
      });
    } else {
      newSupplier();
    }
  };

</script>



<template>

  <div class="min-h-screen">
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 ml-40 w-2/3 p-6 bg-white rounded-lg shadow-lg ">
        <h1 class="text-2xl font-semibold mb-6">Nuevo proveedor</h1>
        <form @submit.prevent >
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
            <InputText type="text" v-model="supplier.name" id="nombre"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm" :invalid="supplier.name === ''" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <inputText type="text" v-model="supplier.email" id="email"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm" :invalid="supplier.email === ''" />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Telefono</label>
            <inputText type="text" v-model="supplier.phone" id="email"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm" :invalid="supplier.phone === ''" />
          </div>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Dirección</label>
            <inputText type="text" v-model="supplier.address" id="email"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm" :invalid="supplier.address === ''" />
          </div>

          <div v-if="loading">
            <Skeleton width="10rem" height="4rem"></Skeleton>
          </div>
          <div class="flex space-x-4" v-else>
            <div class="w-full">
              <label for="neighborhood" class="block text-sm font-medium text-gray-700">Barrio</label>
              <Select v-model="supplier.neighborhood" :options="neighborhoods" optionLabel="name" placeholder="Barrio"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm" id="barrio" />
            </div>
          </div>
          <div class="flex justify-end mt-4 space-x-2">
            <Toast />
            <button @click="showToast()" type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Agregar
            </button>
            <RouterLink :to="{
                        name: 'proveedores',
                        }"><button class="mx-1 hover:bg-red-700 bg-red-600 text-white">
                                Volver
                            </button></RouterLink>
          </div>
        </form>
      </div>
    </div>

  </div>

</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
}</style>