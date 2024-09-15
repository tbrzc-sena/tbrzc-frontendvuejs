<script setup lang="ts">
import AsideClient from "./base/AsideClient.vue";
import HeaderClient from "./base/HeaderClient.vue";
import { ref, watch } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { useAuthStore } from "../../../store/Auth";
const store = useAuthStore();
import { useRouter } from "vue-router";
const router = useRouter();

const USER_ID = gql`
  query MyQuery {
    loggedIn {
      groups {
        edges {
          node {
            name
          }
        }
      }
      address {
        details
        neighborhood {
          id
          name
        }
      }
      id
      firstName
      lastName
      email
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

const UPDATE_MUTATION = gql`
  mutation MyMutation(
    $id: ID!
    $addresDetails: String
    $email: String
    $firstName: String
    $lastName: String
    $neighborhoodId: ID
    $phone: String
  ) {
    updateUser(
      id: $id
      addresDetails: $addresDetails
      email: $email
      firstName: $firstName
      lastName: $lastName
      neighborhoodId: $neighborhoodId
      phone: $phone
    ) {
      user {
        id
      }
    }
  }
`;

const { mutate } = useMutation(UPDATE_MUTATION);

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
let originalEmail = "";
watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      client.value.id = atob(result.value.loggedIn.id).split(":")[1];
      client.value.firstName = result.value.loggedIn.firstName;
      client.value.lastName = result.value.loggedIn.lastName;
      client.value.phone = parseInt(result.value.loggedIn.phone);
      client.value.email = result.value.loggedIn.email;
      originalEmail = result.value.loggedIn.email;
      client.value.addresDetail = result.value.loggedIn.address.details;

      client.value.neighborhoodId = barrios.value.find(
        (barrio) => barrio.id === result.value.loggedIn.address.neighborhood.id
      );
    }
    if (!infoLoading.value && !infoError.value && infoResult.value) {
      barrios.value = infoResult.value.neighborhoods.edges.map(
        (edge) => edge.node
      );
    }
  },
  { immediate: true }
);

const updateInfo = async () => {
  try {
    const response = await mutate({
      id: client.value.id,
      email: client.value.email,
      firstName: client.value.firstName,
      lastName: client.value.lastName,
      phone: client.value.phone.toString(),
      addresDetails: client.value.addresDetail,
      neighborhoodId: atob(client.value.neighborhoodId.id).split(":")[1],
    });
    if (originalEmail !== client.value.email) {
      store.clearJwt();
      store.clearUserRole();
      router.push({ name: "loginview" });
    } else {
      router.push({ name: "dashboard" });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="bg-gray-100 h-screen">
    <HeaderClient></HeaderClient>
    <div class="container mx-auto my-5 p-5">
      <div class="md:flex no-wrap md:-mx-2">
        <AsideClient></AsideClient>
        <div class="bg-white p-3 shadow-sm rounded-sm w-1/2">
          <div
            class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-4"
          >
            <span class="">
              <i class="fa-solid fa-user text-2xl"></i>
            </span>
            <span class="tracking-wide">Modificar</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="flex flex-col">
                <label for="firstName" class="mb-1">Nombres</label>
                <InputText
                  id="firstName"
                  v-model="client.firstName"
                  aria-describedby="firstName-help"
                />
              </div>
              <div class="flex flex-col">
                <label for="lastName" class="mb-1">Apellidos</label>
                <InputText
                  id="lastName"
                  v-model="client.lastName"
                  aria-describedby="lastName-help"
                />
              </div>
              <div class="flex flex-col mb-2">
                <label for="phone" class="mb-1">Numero de telefono</label>
                <InputNumber
                  inputId="withoutgrouping"
                  :useGrouping="false"
                  fluid
                  id="phone"
                  class="w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                  v-model="client.phone"
                />
              </div>
              <div class="flex flex-col" v-if="!infoLoading">
                <label for="neighborhoodId" class="mb-1">Barrio</label>
                <Select
                  v-model="client.neighborhoodId"
                  :options="barrios"
                  optionLabel="name"
                  placeholder="Barrio"
                  id="neighborhoodId"
                />
              </div>
              <div class="flex flex-col">
                <label for="email" class="mb-1">Correo</label>
                <InputText
                  id="email"
                  v-model="client.email"
                  aria-describedby="email-help"
                  class=""
                />
              </div>
              <div class="flex flex-col md:col-span-2">
                <label for="addresDetail" class="mb-1">Detalle direccion</label>
                <Textarea
                  id="addresDetail"
                  v-model="client.addresDetail"
                  rows="5"
                  cols="30"
                  class="resize-none"
                />
              </div>
            </div>
          </div>
          <button
            @click="updateInfo()"
            class="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
