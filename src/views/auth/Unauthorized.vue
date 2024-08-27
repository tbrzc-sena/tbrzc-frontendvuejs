<script setup lang="">
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};</script>
<template>
  <div>
    <h1>Unauthorized</h1>
    <button @click="goBack">click aqui para volver</button>
  </div>

</template>
<style scoped></style>