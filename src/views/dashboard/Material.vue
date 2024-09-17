<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";

const INFO_MATERIAL_QUERY = gql`
  query MyQuery {
    inventoryItems {
      edges {
        node {
          id
          name
          description
          stock
          status
          type
        }
      }
    }
  }
`;

const Add_material = gql`
  mutation addInventoryItem(
    $name: String!
    $description: String
    $stock: Int!
    $type: String!
  ) {
    createInventoryItem(
      name: $name
      description: $description
      stock: $stock
      type: $type
    ) {
      inventoryItem {
        id
      }
    }
  }
`;

//Aqui no se si va alguna referencia en algun campo o asi
let material = ref({
  id: "",
  nombre: "",
  descripcion: "",
  stock: 0,
  type: "RAW",
});

const { result, loading, error } = useQuery(INFO_MATERIAL_QUERY);
watch(
  [result, loading, error],
  () => {
    if (!loading.value && !error.value && result.value) {
      material.value = result.value.inventoryItems.edges.map(
        (edge) => edge.node
      );
    }
  },
  { inmediate: true }
);

const router = useRouter();
const toast = useToast();

const { mutate: addMaterial } = useMutation(Add_material);

const newMaterial = async () => {
  try {
    const response = await addMaterial({
      id: material.value.id,
      name: material.value.nombre,
      description: material.value.descripcion,
      stock: material.value.stock,
      type: material.value.type,
    });
    router.push({ name: "productdashboard" });
  } catch (error) {
    toast.add({
      severity: "warn",
      summary: "Error",
      detail: "Ya existe el material que deseas agregar!",
      life: 3000,
    });
  }
};

const notAvalaible = () => {
  toast.add({
    severity: "warn",
    summary: "Aviso",
    detail: "Esta sección está siendo modificada o el contenido aún no ha sido agregado. Por favor, vuelve más tarde ❤️",
    life: 4000,
  });

};

</script>
<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
      <DashboardAside></DashboardAside>
      <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold inline">Materiales</h1>
          <button  @click="notAvalaible()" class="hover:bg-green-600 bg-green-700 text-white px-4 py-2 rounded">
            Ver materiales
          </button>
        </div>
        <form @submit.prevent >
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="nombre-material"
                class="text-sm font-medium text-gray-700"
                >Nombre Material</label
              >
              <InputText
                type="text"
                v-model="material.nombre"
                id="nombre-material"
                class="border-gray-300 rounded-md shadow-sm w-full"
                :invalid="material.nombre === ''"
              />
            </div>
            <div>
              <label for="stock" class="block text-sm font-medium text-gray-700"
                >Stock</label
              >
              <InputNumber
                v-model="material.stock"
                inputId="stock"
                :min="10"
                :max="100"
                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="descripcion"
              class="block text-sm font-medium text-gray-700"
              >Descripción</label
            >
            <Textarea
              v-model="material.descripcion"
              id="descripcion"
              class="mt-1 w-full border-gray-300 rounded-md shadow-sm resize-none"
              rows="5"
              cols="30"
              :invalid="material.descripcion === ''"
            />
          </div>

          <div v-if="loading">
            <Skeleton width="10rem" height="4rem"></Skeleton>
          </div>
          <div class="flex space-x-4" v-else>
            <Toast />
            <button
              @click="newMaterial()"
              type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
}
</style>
