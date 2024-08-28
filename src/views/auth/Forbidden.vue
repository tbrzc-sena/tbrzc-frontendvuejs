<script setup lang="">
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};</script>
<template>
  <div>
    <h1>403 Forbidden</h1>
    <p> el usuario está autenticado pero no tiene permiso para acceder a la ruta solicitada.</p>
    <button @click="goBack()">click aqui para volver</button>
  </div>

</template>
<style scoped></style>