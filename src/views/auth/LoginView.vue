<script setup lang="ts">
import HeaderAlternative from "../base/HeaderAlternative.vue";
import FooterBase from "../base/FooterBase.vue";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { useAuthStore } from "../../store/Auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Toast from "primevue/toast";


const store = useAuthStore();
let email = ref("");
let password = ref("");
const router = useRouter();

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      payload
    }
  }
`;
const LOGGED_IN_QUERY = gql`
  query {
    loggedIn {
      groups {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

const { mutate: data } = useMutation(LOGIN_MUTATION);
const { result, error, loading, refetch } = useQuery(LOGGED_IN_QUERY);

const login = async () => {
  try {
    const response = await data({
      email: email.value,
      password: password.value,
    });
    if (response.data.tokenAuth.token) {
      store.setJwt(response.data.tokenAuth.token);

      await refetch();
      if (!loading.value && !error.value && result.value) {
        store.setUserRole(result.value.loggedIn.groups.edges[0].node.name);
        if(store.userRole === "Client") {
          router.push({ name: "dashboard" });
        } else {
          router.push({ name: "productdashboard" });
        }
      }
    }
  } catch (error) {
    store.error = error;
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Credenciales incorrectas",
      life: 3000,
    });
  }
};
</script>
<template>
  <HeaderAlternative></HeaderAlternative>
  <div>
    <main>
      <div class="flex w-full justify-center">
        <div class="my-10 flex items-center px-6">
          <div
            class="flex h-full items-center rounded-lg bg-white shadow-md md:rounded-l-lg md:rounded-r-none"
          >
            <div class="m-5 h-min">
              <h1 class="text-xl font-semibold">Bienvenido de nuevo</h1>
              <small class="">Por favor ingrese sus datos</small>
              <form class="mt-4" @submit.prevent>
                <div class="mb-3 flex">
                  <input
                    id="login-email"
                    type="email"
                    placeholder="Email"
                    class="block w-full rounded-md"
                    v-model="email"
                  />
                </div>
                <div class="mb-3 flex">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    class="block w-full rounded-md border"
                    v-model="password"
                  />
                </div>
                <div class="mb-3 flex items-center">
                  <input id="remember" type="checkbox" class="" />
                  <label for="remember" class="mx-2">Recordarme</label>

                  <RouterLink :to="{ name: 'forgotpassword' }" class="mx-2"
                    >Olvido su contraseña?</RouterLink
                  >
                </div>
                <Toast />
                <div class="mb-3">
                  <button type="submit" class="my-1 w-full" @click="login()">
                    iniciar sesión
                  </button>
                </div>
              </form>
              <div class="text-center">
                <p class="">¿No tienes cuenta?</p>
                <RouterLink :to="{ name: 'registerview' }"
                  >Registrarse</RouterLink
                >
              </div>
            </div>
          </div>
          <div class="hidden h-full rounded-r-md md:flex">
            <img
              class="h-full w-full rounded-r-md bg-cover bg-center bg-no-repeat"
              src="/public/assets/imgs/tapetes-final.webp"
            />
          </div>
        </div>
      </div>
    </main>
    <FooterBase></FooterBase>
  </div>
</template>
<style scoped lang="scss"></style>
