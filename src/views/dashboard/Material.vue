<script setup lang="ts">
    import DashboardHeader from "./DashboardHeader.vue";
    import DashboardAside from "./DashboardAside.vue";
    import gql from "graphql-tag";
    import { useQuery } from "@vue/apollo-composable";
    import { ref, computed, watch } from "vue";
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
    mutation updateInventoryItem(
        $id: ID!,
        $name: String,
        $description: String,
        $stock: Int,
        $status: String,
        $type: String
    ) {
        updateInventoryItem(
            id: $id!
            name: $name,
            description: $description,
            stock: $stock,
            status: $status,
            type: $type
        ) {
            inventoryItem {
                id
                name
                description
                stock
                status
                type
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
    status: "",
    type: "",
});


const isValidURL = (string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(string);
  };

const {result, loading, error} = useQuery(INFO_MATERIAL_QUERY);
watch([result, loading, error], () => {
    if (!loading.value && !error.value && result.value) {
        material.value = result.value.inventoryItems.edges.map((edge) => edge.node)
    };
},{ inmediate: true }
);

const { mutate: addMaterial } = useMutation(Add_material);
const router = useRouter();
const toast = useToast();

const newMaterial = async () => {
    try {
        const existingMaterial = material.value.find(
            (item) => item.nombre === material.value.nombre
        );
        if (existingMaterial) {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "El material ya existe!!",
                life: 3000,
            });
            return;
        }

        const response = await addMaterial({
            id: material.value.id,
            name: material.value.nombre,
            description: material.value.descripcion,
            stock: material.value.stock,
            status: material.value.status,
            type: material.value.type,
        });

        if (response && response.data) {
            toast.add({
                severity: "success",
                summary: "Success",
                detail: "Material agregado exitosamente!",
                life: 3000,
            });
            router.push({ name: "###" }); //pendiente
        }
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al agregar material!",
            life: 3000,
        });
        console.error("Error adding material:", error);
    }
};


</script>
<template>
    <div>
        <DashboardHeader></DashboardHeader>
        <div class="grid grid-cols-4 h-screen pt-5 bg-gray-100">
            <DashboardAside></DashboardAside>
            <div class="col-span-2 p-6 bg-white rounded-lg shadow-lg relative">
                <h1 class="text-2xl font-semibold mb-6">Materiales</h1>
                <form @submit.prevent class="space-y-6">
                    <div>
                        <label for="nombre-material" class="block text-sm font-medium text-gray-700">Nombre Material</label>
                        <InputText
                            type="text"
                            v-model="material.nombre"
                            id="nombre-material"
                            class="w-2/3 border-gray-300 rounded-md shadow-sm"
                            :invalid="material.nombre === ''"
                        />
                    </div>
                    <div>
                        <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                        <Textarea
                            v-model="material.descripcion"
                            id="descripcion"
                            class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                            rows="5"
                            cols="30"
                            :invalid="material.descripcion === ''"
                        />
                    </div>
                    <div class="flex space-x-4">
                        <div>
                            <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                            <InputNumber
                                v-model="material.stock"
                                inputId="stock"
                                :min="0"
                                :max="1000"
                                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label for="status" class="block text-sm font-medium text-gray-700">Estado</label>
                            <InputText
                                type="text"
                                v-model="material.status"
                                id="status"
                                class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="tipo-material" class="block text-sm font-medium text-gray-700">Tipo de Material</label>
                        <Select
                            v-model="material.type"
                            :options="tipoMaterial"
                            placeholder="Seleccione el tipo de material"
                            class="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                            id="tipo-material"
                        />
                    </div>
                    <div v-if="loading">
                        <Skeleton width="10rem" height="4rem"></Skeleton>
                    </div>
                    <div class="flex space-x-4" v-else>
                        <button
                            @click="newMaterial"
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
<style scoped lang="scss"></style>
