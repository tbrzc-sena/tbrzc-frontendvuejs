<script setup lang="ts">
import HeaderClient from "./base/HeaderClient.vue";
import AsideClient from "./base/AsideClient.vue";
import { RouterLink } from "vue-router";
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';

</script>
<template>
  <div class="bg-gray-100 h-screen">
    <HeaderClient></HeaderClient>
    <!-- End of Navbar -->
    <!-- -->
    <div class="container mx-auto my-5 p-5">
      <div class="md:flex no-wrap md:-mx-2">
        <!-- Left Side -->
        <AsideClient></AsideClient>

        <!-- Right Side -->
        <div class="w-full md:w-9/12 mx-2">
          <!-- Profile tab -->
          <!-- About Section -->

          <!-- End of about section -->

          <!-- Experience and education -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div>
              <div>
                <div
                  class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                >
                  <span clas="text-green-500">
                    <i class="fa-solid fa-boxes-packing text-2xl"></i>
                  </span>
                  <span class="mx-0">Pedidos</span>
                </div>
                <Message class="w-full h-16" severity="warn">Esta sección está siendo modificada o el contenido aún no ha sido agregado. Por favor, vuelve más tarde ❤️</Message>

                <!--
                                <ul class="list-inside space-y-2">
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>

                                    </li>
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                                -->
              </div>
            </div>
            <!-- End of Experience and education grid -->
          </div>
          <!-- End of profile tab -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
