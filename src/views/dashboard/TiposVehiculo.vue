<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import DashboardAside from "./DashboardAside.vue";

</script>
<template>
  <div class="min-h-screen">
    <DashboardHeader></DashboardHeader>
    <main>
      <div class="grid grid-cols-4 h-screen">
        <DashboardAside></DashboardAside>
        <div
          class="col-span-3 m-5 row-span-3 shadow overflow-hidden rounded border-b border-gray-200 bg-white"
        >
         <!-- <table class="">
            <thead class="">
              <tr>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  id
                </th>

                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  nombre
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  estado
                </th>

                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  descuento
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  tipo
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  cantidad
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle uppercase"
                >
                  precio
                </th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
                <th
                  class="text-gray-500 bg-gray-50 text-center align-middle"
                ></th>
              </tr>
            </thead>

            <tbody class="bg-gray-50">
              <tr v-for="product in productsLst" :key="product.id">
                <td class="align-middle">
                  <div>
                    <p>{{ product.id }}</p>
                  </div>
                </td>

                <td class="align-middle">
                  {{ product.inventoryItem.name }}
                </td>
                <td class="align-middle">
                  <button
                    class="hover:bg-green-600 bg-green-600 font-bold text-white rounded-full"
                  >
                    {{ product.inventoryItem.status }}
                  </button>
                </td>

                <td class="align-middle text-green-600 font-bold">
                  {{ product.category.discount }}%
                </td>
                <td class="align-middle">
                  {{ product.inventoryItem.type }}
                </td>
                <td class="align-middle">
                  <button
                    class="hover:bg-orange-500 bg-orange-500 font-bold text-white rounded-full"
                  >
                    {{ product.inventoryItem.stock }}
                  </button>
                </td>
                <td class="align-middle font-bold">
                  {{ product.price }}
                </td>
                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'updateproductoview',
                      params: { id: product.id  },
                    }"
                    ><button
                      class="hover:bg-green-600 bg-green-700 font-bold text-white"
                    >
                      Editar
                    </button></RouterLink
                  >
                </td>
                <td class="align-middle">
                  <button
                    class="hover:bg-red-700 bg-red-500 font-bold text-white"
                    @click="deleteProduct(product.id)"
                  >
                    Eliminar
                  </button>
                </td>
                <td class="align-middle">
                  <RouterLink
                    :to="{
                      name: 'productoview',
                      params: { id: product.id },
                    }"
                    ><button
                      class="hover:bg-blue-500 bg-blue-700 font-bold text-white"
                    >
                      Ver
                    </button></RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
          -->
        </div>
      </div>
    </main>
  </div>
</template>
