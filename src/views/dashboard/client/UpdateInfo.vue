<script setup lang="ts">
import AsideClient from "./base/AsideClient.vue";
import HeaderClient from "./base/HeaderClient.vue";
import { ref, watch } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const USER_ID = gql`
  query getUserLogged{
    loggedIn {
      id
      email
      firstName
      lastName
      phone
    }
  }
`;
const BARRIOS_QUERY = gql`
  query getAllBarrios {
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
let client = ref({
  id: 0,
  firstName: "",
  lastName: "",
  phone: 0,
  email: "",
  addresDetail: "",
  neighborhoodId: "",
});

let barrios = ref([]);

const { result, loading, error } = useQuery(USER_ID);
const {
  result: infoResult,
  loading: infoLoading,
  error: infoError,
} = useQuery(BARRIOS_QUERY);


watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      client.value.id = atob(result.value.loggedIn.id).split(":")[1];
      client.value.firstName = result.value.loggedIn.firstName;
      client.value.lastName = result.value.loggedIn.lastName;
      client.value.phone = parseInt( result.value.loggedIn.phone);
      client.value.email = result.value.loggedIn.email;
    }
    if (!infoLoading.value && !infoError.value && infoResult.value) {
      barrios.value = infoResult.value.neighborhoods.edges.map(
        (edge) => edge.node
      );
    }
  },
  { immediate: true }
);





</script>
<template>
  <div class="bg-gray-100 h-screen">
    <HeaderClient></HeaderClient>
    <div class="container mx-auto my-5 p-5">
      <div class="md:flex no-wrap md:-mx-2">
        <AsideClient></AsideClient>

        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div
            class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
          >
            <span clas="text-green-500">
              <i class="fa-solid fa-user text-2xl"></i>
            </span>
            <span class="tracking-wide">Modificar</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <label for="firstName">Nombres</label>
                <InputText
                  id="firstName"
                  v-model="client.firstName"
                  aria-describedby="firstName-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div class="grid grid-cols-2">
                <label for="lastName">Apellidos</label>
                <InputText
                  id="lastName"
                  v-model="client.lastName"
                  aria-describedby="lastName-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div class="grid grid-cols-2">
                <label for="phone">Numero de telefono</label>
                <InputNumber
                  inputId="withoutgrouping"
                  :useGrouping="false"
                  fluid
                  id="phone"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                  v-model="client.phone"
                />
              </div>
              <p v-if="infoLoading">...</p>
              <div class="grid grid-cols-2" v-else>
                <label
                  for="neighborhoodId"
                  class="block text-sm font-medium text-gray-700"
                  >Barrio</label
                >
                <Select
                  v-model="client.neighborhoodId"
                  :options="barrios"
                  optionLabel="name"
                  placeholder="Barrio"
                  class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  id="neighborhoodId"
                />
              </div>
              <div class="grid grid-cols-2">
                <label for="addresDetail">Detalle direccion</label>
                <InputText
                  id="addresDetail"
                  v-model="client.addresDetail"
                  aria-describedby="addresDetail-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div class="grid grid-cols-2">
                <label for="email">Correo</label>
                <InputText
                  id="email"
                  v-model="client.email"
                  aria-describedby="email-help"
                  class="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>
          <button class="w-full">Editar perfil</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
