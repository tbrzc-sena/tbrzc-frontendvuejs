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
  <aside>
    <Carousel :value="products" :numVisible="3" :numScroll="3">
      <template #item="slotProps">
        <div class="product-item">
          <div class="product-image-container">
            <img
              :src="slotProps.data.imageLink"
              :alt="slotProps.data.inventoryItem.name"
              class="product-image"
            />
            <Tag
              :value="slotProps.data.inventoryItem.status"
              :severity="getSeverity(slotProps.data.inventoryItem.status)"
              class="status-tag"
            />
          </div>
          <div class="product-details">
            <div class="product-name">
              {{ slotProps.data.inventoryItem.name }}
            </div>
            <div class="product-price">${{ slotProps.data.price }}</div>
          </div>
        </div>
      </template>
    </Carousel>
  </aside>
  <!-- <RouterLink :to="{ name: 'productosview' }">atras</RouterLink>-->
  <FooterBase></FooterBase>
</template>
<style scoped lang="scss">
.product-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px; /* Reducir padding */
  margin: 4px; /* Reducir margen */
  text-align: center;
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* Aspect ratio 16:9 para hacer las imágenes más compactas */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-tag {
  position: absolute;
  top: 4px; /* Reducir distancia desde el borde superior */
  left: 4px; /* Reducir distancia desde el borde izquierdo */
}

.product-details {
  margin-top: 8px; /* Reducir margen superior */
}

.product-name {
  font-weight: bold;
  margin-bottom: 4px; /* Reducir margen inferior */
  font-size: 0.9em; /* Reducir tamaño de fuente */
}

.product-price {
  color: #ff5722;
  font-size: 1em; /* Reducir tamaño de fuente */
}
</style>
