<script setup lang="ts">
import HeaderAlternative from "./base/HeaderAlternative.vue";
import FooterBase from "./base/FooterBase.vue";

import { ref } from "vue";
import ToggleButton from 'primevue/togglebutton';



let checked = ref(false);
</script>
<template>
  <HeaderAlternative />

    <div class="flex justify-center">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 flex">
      <div class=" pr-6">
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="w-full rounded shadow-md">
      </div>
      <div class="">
        <h1 class="text-2xl font-bold ">Crear Orden Personalizada</h1>
        <form @submit.prevent="submitForm">
          <div>
            <p class="">base antideslizante?</p>
            <ToggleButton v-model="checked" onIcon="pi pi-check" offIcon="pi pi-times" :invalid="!checked" class="w-full sm:w-40" aria-label="Confirmation" />
          </div>
        </form>
      </div>
    </div>
  </div>


  <FooterBase />
</template>

<style scoped></style>
