<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from "vue";
const route = useRoute();
const isUpdateInfoRoute = computed(() => route.path === '/client/dashboard/updateinfo');
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "vue";

const LOGGED_IN_QUERY = gql`
 query{
  loggedIn {
    email
    firstName
    lastName
    phone
    dateJoined
    lastLogin
  }
}
`;
let client = ref({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateJoined: "",
    lastLogin: ""
});



const { result, loading, error } = useQuery(LOGGED_IN_QUERY);


watch(
    [result, loading, error],
    () => {
        if (!loading.value && !error.value && result.value) {
            client.value = result.value.loggedIn;
        }
    },
    { immediate: true }
);


</script>
<template>
    <div class="w-full md:w-3/12 md:mx-2">
        <!-- Profile Card -->
        <h1 v-if="loading">...</h1>
        <div v-else class="bg-white p-3 border-t-4 border-green-400">


            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ client.firstName }} {{ client.lastName }}</h1>
            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Telefono: {{ client.phone }}</p>
            <ul
                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                    <span>Cliente desde: {{ client.dateJoined }}</span>
                </li>
                <li>
                    <RouterLink :to="{ name: 'updateinfo' }" class="mr-5">Editar perfil</RouterLink>
                    <RouterLink :to="{ name: 'dashboard' }" class="" v-if="isUpdateInfoRoute">Volver</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped></style>