import { createApp,provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client/core";
import { createPinia } from 'pinia'
const pinia = createPinia()
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from './store/Auth';

import { DefaultApolloClient } from '@vue/apollo-composable'
const httpLink = new createHttpLink({
  uri:'https://api-carpet.onrender.com'
})
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';  // Import PrimeIcons


const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore();
  const token = authStore.getJwt;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});



const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})



import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import FloatLabel from "primevue/floatlabel";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Textarea from "primevue/textarea";
import ToggleButton  from "primevue/togglebutton";



const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
});
app.use(router);
app.use(pinia)
app.use(ToastService);


app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "light",
    },
  },
});

app.component("InputNumber", InputNumber);
app.component("FloatLabel", FloatLabel);
app.component("Button", Button);
app.component("InputMask", InputMask);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Select", Select);
app.component("ToggleButton", ToggleButton);





app.mount("#app");
