<script lang="ts" setup>
import HeaderBase from "./base/HeaderBase.vue";
import FooterBase from "./base/FooterBase.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <HeaderBase></HeaderBase>
  <main>
    <section
      class="relative bg-cover bg-no-repeat"
      style="
        background-image: url(assets/imgs/banners_autocarpet_tapetesgeneralMesa-de-trabajo-1-1100x519.webp);
      "
    >
      <div class="">
        <div class="flex h-2/3 items-center justify-center px-4 py-16">
          <div class="m-2">
            <h1
              class="text-right text-6xl font-black leading-normal text-white"
            >
              Encuentre el <span class="fancy">tapete</span> que desea y si no
              lo encuentra, se lo <span class="fancy">hacemos.</span>
            </h1>
          </div>
          <lottie-player
            class="hidden xl:block"
            src="/public/assets/animations/json/animation_ll8hu3ps.json"
            background="Transparent"
            speed=" 1"
            style="width: 500px; height: 500px"
            direction="1"
            mode="bounce"
            loop
            autoplay
          ></lottie-player>
          <div class="hidden lg:col-span-5 lg:mt-0 lg:flex"></div>
        </div>
      </div>
    </section>
    <section class="w-10/12 mx-auto">
      <h2 class="text-center text-3xl text-black m-8">
        Busca el tapete perfecto para ti
      </h2>
      <form action="" class="flex">
        <select name="" id="" class="w-full">
          <option value="" class="">Marca</option>
        </select>
        <select name="" id="" class="w-full">
          <option value="" class="">Modelo</option>
          <option value="" class=""></option>
        </select>
        <select name="" id="" class="w-full">
          <option value="" class="">Material</option>
          <option value="" class=""></option>
        </select>
        <button>buscar</button>
      </form>
    </section>
    <br />
    <section>
      <div class="w-10/12 mx-auto">
        <div class="grid grid-cols-3">
          <div
            class="flex justify-center col-start-1 col-end-4 md:justify-end md:col-start-1 md:col-end-2"
          >
            <div
              class="flex flex-col w-3/4 h-min rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1 my-4"
            >
              <RouterLink
                :to="{ name: 'productosview', params: { categoria: 'premium' }, }"
                class="text-white"
                ><img
                  class="rounded-t-lg"
                  src="/public/assets/imgs/premium-uno.webp"
                  alt="Hollywood Sign on The Hill"
              /></RouterLink>
              <div class="flex flex-col m-4 justify-evenly">
                <p class="font-semibold text-blue-900 text-2xl md:text-lg">
                  Tapetes para vehiculo
                  <span class="text-blue-700"> premium one</span>
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center col-start-1 col-end-4 md:col-start-2 md:col-end-3"
          >
            <div
              class="flex flex-col w-3/4 h-min rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1 my-4"
            >

            <RouterLink
                :to="{ name: 'productosview', params: { categoria: 'deluxe' }, }"
                class="text-white"
                ><img
                  class="rounded-t-lg"
                  src="/public/assets/imgs/tapete_carro-deluxe-1-510x510-1.webp"
                  alt="Hollywood Sign on The Hill"
                /></RouterLink>
              <div class="flex flex-col m-4 justify-evenly">
                <a href="product_detail.html">
                  <p class="font-semibold text-blue-900 text-2xl md:text-lg">
                    Tapetes para vehiculo en alfombra
                    <span class="text-blue-700">Deluxe</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center col-start-1 col-end-4 md:col-start-3 md:col-end-4 md:justify-start"
          >
            <div
              class="flex flex-col w-3/4 h-min rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1 my-4"
            >
            <RouterLink
                :to="{ name: 'productosview', params: { categoria: 'ultramat' }, }"
                class="text-white"
                ><img
                  class="rounded-t-lg"
                  src="/public/assets/imgs/pvc_ultramat.webp"
                  alt="Hollywood Sign on The Hill"
                /></RouterLink>
              <div class="flex flex-col m-4 justify-evenly">
                <a href="product_detail.html">
                  <p class="font-semibold text-blue-900 text-2xl md:text-lg">
                    Tapetes <span class="text-blue-700">Ultramat</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center col-start-1 col-end-4 md:col-start-1 md:col-end-2 md:justify-end"
          >
            <div
              class="flex flex-col w-3/4 h-min rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1 my-4"
            >
            <RouterLink
                :to="{ name: 'productosview', params: { categoria: 'ironmat' }, }"
                class="text-white"
                ><img
                  class="rounded-t-lg"
                  src="/public/assets/imgs/pvc_ironmat.webp"
                  alt="Hollywood Sign on The Hill"
                /></RouterLink>
              <div class="flex flex-col m-4 justify-evenly">
                <a href="product_detail.html">
                  <p class="font-semibold text-blue-900 text-2xl md:text-lg">
                    Tapetes para vehiculo en
                    <span class="text-blue-700">PVC</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center col-start-1 col-end-4 md:col-start-2 md:col-end-3"
          >
            <div
              class="flex flex-col w-3/4 h-min rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1 my-4"
            >
            <RouterLink
                :to="{ name: 'productosview', params: { categoria: 'viper' }, }"
                class="text-white"
                ><img
                  class="rounded-t-lg"
                  src="/public/assets/imgs/viper.webp"
                  alt="Hollywood Sign on The Hill"
                /></RouterLink>
              <div class="flex flex-col m-4 justify-evenly">
                <a href="product_detail.html">
                  <p class="font-semibold text-blue-900 text-2xl md:text-lg">
                    Tapetes en alfombra <span class="text-blue-700">Viper</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center col-start-1 col-end-4 md:col-start-3 md:col-end-4 md:justify-start"
          >
            <div
              class="flex flex-col w-3/4 h-min rounded-lg bg-white shadow-lg hover:bg-slate-100 col-span-1 my-4"
            >
            <RouterLink
                :to="{ name: 'productosview', params: { categoria: 'termoformado' }, }"
                class="text-white"
                ><img
                  class="rounded-t-lg"
                  src="/public/assets/imgs/tapetes-termoformados-550x550.webp"
                  alt="Hollywood Sign on The Hill"
                /></RouterLink>
              <div class="flex flex-col m-4 justify-evenly">
                <a href="product_detail.html">
                  <p class="font-semibold text-blue-900 text-2xl md:text-lg">
                    Tapetes <span class="text-blue-700">Termoformados </span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <FooterBase></FooterBase>
</template>
<style scoped lang="scss"></style>
