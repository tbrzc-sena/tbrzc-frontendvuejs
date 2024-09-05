<script setup lang="ts">
import AsideClient from "./base/AsideClient.vue";
import HeaderClient from "./base/HeaderClient.vue";
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
                        <div class="px-4 py-2 font-semibold">First Name</div>
                        <div class="px-4 py-2">Jane</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Last Name</div>
                        <div class="px-4 py-2">Doe</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Contact No.</div>
                        <div class="px-4 py-2">+11 998001001</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Current Address</div>
                        <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Email.</div>
                        <div class="px-4 py-2">
                            <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                        </div>
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
