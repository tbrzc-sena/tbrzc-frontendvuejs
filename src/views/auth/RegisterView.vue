<script setup lang="ts">
import HeaderAlternative from "../base/HeaderAlternative.vue";
import FooterBase from "../base/FooterBase.vue";
import gql from "graphql-tag";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from 'vue-router';
const router = useRouter();

import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
const toast = useToast();

//https://apollo.vuejs.org/guide-option/queries.html

const REGISTER_MUTATION = gql`
  mutation register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $phone: String!) {
  registerUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    phone: $phone
  ) {
    user {
      __typename
    }
  }
}
`;

let email = ref("");
let password = ref("");
let password_confirmation = ref("");
let firstName = ref("");
let lastName = ref("");
let phone = ref("");

const { mutate: data } = useMutation(REGISTER_MUTATION);
const register = async () => {
  try {
    const response = await data({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
    });
    router.push({ name: "loginview" });
  } catch (error) {
    console.log(error)
  }
};
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const showToast = () => {
  if ( password.value === "" || password.value.trim() === "" || password.value.length <= 8 || password.value.length > 20) {

    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa una contraseña valida de minimo 8 caracteres, incluye al menos un dígito, una letra mayúscula, una letra minúscula, y un carácter especial (@, $, !, %, *, ?, &, #)",
      life: 10000,
    });
  }else if(firstName.value === "" || firstName.value.trim() === "" || firstName.value.length < 2 && lastName.value === "" || lastName.value.trim() === "" || lastName.value.length < 2) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un nombre y apellido valido",
      life: 3000,
    });

  }else if(password.value !== password_confirmation.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Las contraseñas no coinciden",
      life: 3000,
    });

  }else if(phone.value === "" || phone.value.trim() === "" || phone.value.length < 10) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ingresa un número de telefono valido",
      life: 3000,
    });
  }else if(!emailRegex.test(email.value)){
    toast.add({
    severity: "error",
    summary: "Error",
    detail: "Ingresa un correo electrónico válido",
    life: 3000,
  });
  }
  else {
    register();
  }
};
</script>
<template>
  <HeaderAlternative></HeaderAlternative>
  <main class="">
    <div class="flex items-center justify-center md:justify-self-start p-10">
      <div class="mx-auto hidden xl:block">
        <lottie-player
          class=""
          src="assets/animations/json/Animation-1691717368127.json"
          background="Transparent"
          speed=" 1"
          style="width: 500px; height: 500px"
          direction="1"
          mode="bounce"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="mx-auto">
        <div
          class="flex items-center justify-center rounded-lg bg-white px-14 shadow-xl"
        >
          <div class="">
            <div class="pt-4">
              <h2 class="py-1 text-center">Registrarse</h2>
              <p class="py-1 text-center">¿Ya tienes una cuenta?
                <RouterLink :to="{ name: 'loginview' }" class="mx-2"
                  >Inicia sesión aquí</RouterLink
                >
              </p>
            </div>
            <form class="text-sm" @submit.prevent>
              <div class="my-4 flex flex-col">
                <label for="name" class="">Nombres</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="mt-2 p-2"
                  placeholder="ej: Daniel Santiago"
                  v-model="firstName"
                />
              </div>
              <div class="mb-3 flex my-4 flex-col">
                <label for="lastname" class="">Apellidos</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="ej: Lara Cala"
                  class="block w-full rounded-md border"
                  v-model="lastName"
                />
              </div>

              <div class="my-4 flex flex-col">
                <label for="email" class="">Email</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  class="mt-2 p-2"
                  placeholder="ej: exampleEmail@gmail.com"
                  v-model="email"
                />
              </div>

              <div class="my-4 flex flex-col">
                <label for="password" class=""><strong> Contraseña</strong></label>
                <p class="inline max-w-56">incluye al menos un dígito, una letra mayúscula, una letra minúscula, y un carácter especial (@, $, !, %, *, ?, &, #)</p>
                <div class="mt-2 flex items-center">
                  <input
                    id="password-signup"
                    class="flex-1 p-2 pr-10"
                    placeholder="Ingresa una contraseña segura"
                    type="password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="my-4 flex flex-col">
                <label for="password_confirmation" class=""
                  ></label
                >
                <div class="mt-2 flex items-center">
                  <input
                    name="password_confirmation"
                    id="password_confirmation"
                    class="flex-1 border p-2 pr-10"
                    placeholder="Introduce tu contraseña de nuevo"
                    type="password"
                    v-model="password_confirmation"
                  />
                </div>
              </div>

              <div class="mb-3 flex my-4 flex-col">
                <label for="phone" class="">Telefono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Telefono"
                  class="block w-full rounded-md border"
                  v-model="phone"
                />
              </div>
              <!--
              <div class="flex items-center">
                <input
                  type="checkbox"
                  name="remember_me"
                  id="remember_me"
                  class="mr-2 rounded"
                />
                <label for="remember_me" class="">
                  Acepto los <a href="#" class="">términos</a> y la
                  <a href="#" class="">política de privacidad</a>
                </label>
              </div>
-->
              <div class="my-4 flex items-center justify-end space-x-4">
                <Toast />
                <button type="submit"
                @click="showToast()"
                  class="rounded-lg px-8 py-2 uppercase transition duration-150 hover:shadow-xl"
                >
                  Registrarse
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </main>
  <FooterBase></FooterBase>
</template>
<style scoped></style>
