<script setup lang="ts" >
import DashboardAside from './DashboardAside.vue';
import DashboardHeader from './DashboardHeader.vue';

import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from "vue-router";
const route = useRoute();
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Skeleton from "primevue/skeleton";

let neighborhood = ref()
let supplier = ref({
    id: "",
    email: "",
    name: "",
    address: "",
    phone: "",
    neighborhood: "",
})

let supplierId = ref(route.params.id);
let decodedID = computed(() => atob(supplierId.value).split(":")[1]);

const INFO_NEIGHBORHOODS = gql`
query NeighborhoodsList {
  neighborhoods {
    edges {
      node {
        id
        name
      }
    }
  }
}
`;

const UPDATE_SUPPLIER = gql`
mutation UpdateSupplier (
  $supplierId: ID!
  $email: String!
  $address: String!
  $neighborhood: ID!
  $phone: String!
  $name: String!
	) {
  	updateSupplier(
    	id: $supplierId
    	email: $email
    	addressDetails: $address
    	neighborhoodId: $neighborhood
    	phone: $phone
        name: $name
  ) {
    supplier {
      email
      name
      phone
      address {
        details
      }
    }
  }
}
`;

const SUPPLIERS_QUERY = gql`
query GetSupplier ($id: ID!) {
  supplier(id : $id) {
    email
    id
    name
    phone
    address {
      details
      neighborhood {
        id
        name
      }
    }
  }
}
`;

const {
    result: infoResult,
    loading: infoLoading,
    error: infoError,
} = useQuery(INFO_NEIGHBORHOODS);

const { result, loading, error } = useQuery(SUPPLIERS_QUERY, () => ({
    id: decodedID.value,
}), {
    enabled: computed(() => !!decodedID.value)
});

const loadSupplierData = () => {
    watch(
        [infoResult, infoLoading, infoError],
        () => {
            if (!infoLoading.value && !infoError.value && infoResult.value) {
                neighborhood.value = infoResult.value.neighborhoods.edges.map(
                    (edge) => edge.node
                );
            }
        },
        { immediate: true }
    );
    watch(
        [result, loading, error],
        () => {
            if (!loading.value && !error.value && result.value) {
                const supplierData = result.value.supplier;
                supplier.value = {
                    id: decodedID.value,
                    name: supplierData.name,
                    email: supplierData.email,
                    phone: supplierData.phone,
                    address: supplierData.address.details,
                    neighborhood: supplierData.address.neighborhood.id,
                };

                supplier.value.neighborhood = neighborhood.value.find(
                    (neighborhood) => neighborhood.id === supplierData.address.neighborhood.id
                );
            }
        },
        { immediate: true }
    );

};

watch(
    () => route.params.id,
    (newId) => {
        supplierId.value = newId;
        if (decodedID.value) {
            loadSupplierData();
        }
    },
    { immediate: true }
);


const { mutate } = useMutation(UPDATE_SUPPLIER);
const updateSupplier = async () => {

    console.log('Supplier value:', supplier.value);
    try {
        const response = await mutate({
            supplierId: supplier.value.id,
            name: supplier.value.name,
            email: supplier.value.email,
            phone: supplier.value.phone,
            address: supplier.value.address,
            neighborhood: atob(supplier.value.neighborhood.id).split(":")[1]
        });
        router.push({ name: "proveedores" });

    } catch (error) {
        console.log(error);

    }
};

const showToast = () => {
    updateSupplier();
};


</script>
<template>
    <div>
        <DashboardHeader></DashboardHeader>
        <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
            <DashboardAside></DashboardAside>
            <div class="col-span-2 ml-40 w-2/3 p-6 bg-white rounded-lg shadow-lg relative">
                <h1 class="text-2xl  font-semibold mb-6">Actualizar Modelo Vehiculo</h1>
                <form @submit.prevent class="space-y-6">
                        <div class="">
                            <label for="nombre-modelo" class="block text-sm font-medium text-gray-700">Nombre</label>
                            <InputText type="text" v-model="supplier.name" id="nombre-modelo"
                                :invalid="supplier.name === ''" class="w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Nombre del modelo" />
                        </div>
                        <div class="">
                            <label for="año" class="block text-sm font-medium text-gray-700">Email</label>
                            <InputText type="text" v-model="supplier.email" id="nombre-modelo"
                                :invalid="supplier.email === ''" class="w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Nombre del modelo" />
                        </div>
                        <div class="">
                            <label for="nombre-modelo" class="block text-sm font-medium text-gray-700">Phone</label>
                            <InputText type="text" v-model="supplier.phone" id="nombre-modelo"
                                :invalid="supplier.phone === ''" class="w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Nombre del modelo" />
                        </div>
                        <div class="">
                            <label for="nombre-modelo" class="block text-sm font-medium text-gray-700">Dirección</label>
                            <InputText type="text" v-model="supplier.address" id="nombre-modelo"
                                :invalid="supplier.address === ''" class="w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Nombre del modelo" />
                        </div>

                    <div v-if="loading">
                        <Skeleton width="10rem" height="4rem"></Skeleton>
                    </div>
                    <div class="flex space-x-4" v-else>
                        <div class="w-1/2">
                            <label for="nombre-modelo" class="block text-sm font-medium text-gray-700">Barrio</label>
                            <div class="flex items-center space-x-2 mt-1">
                                <Select v-model="supplier.neighborhood" :options="neighborhood" optionLabel="name"
                                    class="w-full border-gray-300 rounded-md shadow-sm" id="tipo-vehiculo"
                                    placeholder="Tipo Vehiculo" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-4 space-x-2">

                        <Toast />
                        <button type="submit" @click="showToast()"
                            class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Actualizar Modelo
                        </button>
                        <RouterLink :to="{
                        name: 'proveedores',
                        }"><button class="mx-1 hover:bg-red-700 bg-red-600 text-white">
                                Volver
                            </button></RouterLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
