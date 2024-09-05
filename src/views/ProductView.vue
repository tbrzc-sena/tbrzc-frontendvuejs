<script lang="ts" setup>
import { RouterLink } from "vue-router";
import ProductDetail from "../components/ProductDetail.vue";

import HeaderAlternative from "./base/HeaderAlternative.vue";
import FooterBase from "./base/FooterBase.vue";
import Carousel from "primevue/carousel";

import { ref, watch } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import Tag from "primevue/tag";

const GET_PRODUCTS = gql`
  query MyQuery {
    products {
      edges {
        node {
          carModel {
            name
            make {
              name
            }
            year
          }
          category {
            discount
            name
          }
          imageLink
          price
          inventoryItem {
            description
            name
            stock
            status
            type
          }
          id
        }
      }
    }
  }
`;

let products = ref();
const { result, loading, error } = useQuery(GET_PRODUCTS);

watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      products.value = result.value.products.edges.map((edge) => edge.node);
    }
  },
  { immediate: true }
);
const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";
    case "LOWSTOCK":
      return "warning";
    case "OUTOFSTOCK":
      return "danger";
    default:
      return null;
  }
};
</script>
<template>
  <HeaderAlternative></HeaderAlternative>
  <main>
    <ProductDetail />
  </main>
  <!-- <RouterLink :to="{ name: 'productosview' }">atras</RouterLink>-->
  <FooterBase></FooterBase>
</template>
<style scoped lang="scss">
</style>
