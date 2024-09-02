<script setup lang="ts">

import gql from "graphql-tag";
const LOGGED_IN_QUERY = gql`
 query{
  loggedIn {
    email
    groups {
      edges {
        node {
          name
        }
      }
    }
  }
}
`;

import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "vue";

let client = ref({
    email: "",
    groups: {
        edges: [
            {
                node: {
                    name: ""
                }
            }
        ]
    }
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
import { useRouter } from 'vue-router'
import { useAuthStore } from "../../../../store/Auth";
const store = useAuthStore();
const router = useRouter();


const logout = () => {
    store.clearJwt();
    store.clearUserRole();
    router.push({ name: 'loginview' });
};

</script>

<template>

    <div class="w-full text-white bg-main-color">
        <div
            class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">

            <div class="p-4 flex flex-row items-center justify-between">
                <RouterLink :to="{ name: 'homeview' }">
                    <div class="flex">
                        <img src="/public/assets/imgs/autocarpet_logo.webp" alt="" class="my-0" />
                    </div>
                </RouterLink>



                <p class="text-lg font-semibold text-black tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">{{
                    client.email }}
                {{ client.groups.edges[0].node.name }}</p>


            </div>
            <nav class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
                <div class="relative">
                    <div
                        class="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left  00 md:w-auto md:inline md:mt-0 md:ml-4   focus:outline-none focus:shadow-outline">
                        <li class="mx-1" @click="logout()">
                            <button>
                                Cerrar sesión
                            </button>

                        </li>


                    </div>

                </div>
            </nav>
        </div>
    </div>
</template>

<style scoped></style>
