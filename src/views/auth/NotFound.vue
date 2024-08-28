<script setup lang="">
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};</script>
<template>
  <div>
    <h1>404 Not Found</h1>
    <p> El recurso al que intentas acceder no existe</p>
    <button @click="goBack()">click aqui para volver</button>
  </div>

</template>
<style scoped></style>