<script setup lang="">
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};</script>
<template>
  <div>
    <h1>401 Unauthorized</h1>
    <p>el acceso al recurso requiere autenticación y el usuario no se ha autenticado correctamente.</p>
    <button @click="goBack()">click aqui para volver</button>
  </div>

</template>
<style scoped></style>