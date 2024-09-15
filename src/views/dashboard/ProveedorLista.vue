<script setup lang="ts">
import DashboardAside from "./DashboardAside.vue";
import DashboardHeader from "./DashboardHeader.vue";
import gql from "graphql-tag";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
const toast = useToast();
let supplierList = ref();


const SUPPLIERS_QUERY = gql`
  query {
    suppliers {
      edges {
        node {
          email
          id
          name
          phone
          address {
            details
            neighborhood {
              name
              locality {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const DELETE_SUPPLIER = gql `
mutation DeleteSupplier ($id: ID!) {
  deleteSupplier(id: $id) {
    supplier {
      name
    }
  }
}
`


const { result, loading, error, onResult, refetch } = useQuery(SUPPLIERS_QUERY);

onResult((queryResult) => {
    supplierList.value = queryResult.data.suppliers.edges.map((supplier) => supplier.node);
});

onMounted(() => {
    refetch();
});

const { mutate: data } = useMutation(DELETE_SUPPLIER);
const deleteSupplier = async (idf) => {
  let decodedID = atob(idf).split(":")[1]
  try {
    const response = await data({
      id: decodedID,
    });

    supplierList.value = supplierList.value.filter((supplier) => supplier.id !== idf);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error al eliminar",
      detail: "No se pudo eliminar el Proveedor",
      life: 2000,
    });
  }
};

const showToast = (idf) => {
  toast.add({
    severity: "success",
    summary: "Proveedor eliminado",
    detail: "El Proveedor ha sido eliminado con exito",
    life: 2000,
  })
  deleteSupplier(idf);
};
</script>

<template>
    <div class="min-h-screen">
        <DashboardHeader></DashboardHeader>
        <main>
            <div class="grid grid-cols-4 h-screen">
                <DashboardAside></DashboardAside>
                <div class="col-span-3 m-5 row-span-3 shadow overflow-hidden rounded border-b border-gray-200 bg-white">
                    <div v-if="loading">Loading...</div>
                    <table class="" v-else>
                        <thead class="">
                            <tr>

                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                    nombre
                                </th>
                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                    email
                                </th>
                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                    telefono
                                </th>
                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                    dirección
                                </th>
                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                    barrio
                                </th>
                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                </th>
                                <th class="text-gray-500 bg-gray-50 text-center align-middle uppercase">
                                    <RouterLink :to="{ name: 'newProveedor' }">
                                        <button class="hover:bg-green-600 bg-green-500 font-bold text-white">
                                            Agregar
                                        </button>
                                    </RouterLink>
                                </th>
                            </tr>
                        </thead>

                        <tbody class="bg-gray-50">

                            <tr v-for="supplier in supplierList" :key="supplier.id">

                                <td class="align-middle">
                                    {{ supplier.name }}
                                </td>
                                <td class="align-middle">
                                    <p class="">
                                        {{ supplier.email }}
                                    </p>
                                </td>
                                <td class="align-middle">
                                    <p class="">
                                        {{ supplier.phone }}
                                    </p>
                                </td>
                                <td class="align-middle">
                                    <p class="">
                                        {{ supplier.address.details }}
                                    </p>
                                </td>
                                <td class="align-middle">
                                    <p class="">
                                        {{ supplier.address.neighborhood.name }}
                                    </p>
                                </td>

                                <td class="align-middle">
                                    <RouterLink :to="{
                                        name: 'supplierUpdate',
                                        params: { id: supplier.id },
                                    }"><button class="hover:bg-green-600 bg-green-700 text-white">
                                            Editar
                                        </button></RouterLink>
                                </td>

                                <td class="align-middle">
                                    <Toast />
                                    <button class="hover:bg-red-700 bg-red-600 text-white"
                                        @click="showToast(supplier.id)">
                                        Eliminar
                                    </button>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>