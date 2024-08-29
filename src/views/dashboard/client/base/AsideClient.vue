<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed  } from "vue";
const route = useRoute();
const isUpdateInfoRoute = computed(() => route.path === '/client/dashboard/updateinfo');

</script>
<template>
    <div class="w-full md:w-3/12 md:mx-2">
        <!-- Profile Card -->
        <div class="bg-white p-3 border-t-4 border-green-400">
            
            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{firstName} + {lastName}</h1>
            <h3 class="text-gray-600 font-lg text-semibold leading-6">{lastLogin}</h3>
            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {phone}</p>
            <ul
                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                    <span>{isActive}</span>
                    <span class="ml-auto"><span
                            class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                </li>
                <li class="flex items-center py-3">
                    <span> {dateJoined}</span>
                    <span class="ml-auto">Nov 07, 2016</span>
                </li>
                <li>
                    <RouterLink :to="{ name: 'updateinfo' }" class="">Editar perfil</RouterLink>
                    <RouterLink :to="{ name: 'dashboard' }" class="" v-if="isUpdateInfoRoute" >Volver</RouterLink>
                    
                </li>
            </ul>
        </div>
        <!-- End of profile card -->
        <div class="my-4"></div>

        <!-- End of friends card -->
    </div>
</template>
<style scoped></style>