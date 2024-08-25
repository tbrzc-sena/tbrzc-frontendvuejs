import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "@/views/ProductsView.vue";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import AddView from "@/views/AddView.vue";
import UpdateView from "@/views/UpdateView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/auth/LoginView.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import ProductDashboard from "../views/dashboard/ProductDashboard.vue";
import PersonalizacionView from "../views/PersonalizacionView.vue";
import CompraView from "../views/CompraView.vue";
import CategoriaDashboard from "../views/dashboard/CategoriaDashboard.vue";
import { useAuthStore } from "../store/Auth";
import ProductFilter from "../components/ProductFilter.vue";
import ModeloVehiculo from "../views/dashboard/ModeloVehiculo.vue";
import ListaCategorias from "../views/dashboard/ListaCategorias.vue";
import TiposVehiculo from "../views/dashboard/TiposVehiculo.vue";
import ModelosVehiculo from "../views/dashboard/ModelosVehiculo.vue";
import CategoriaUpdate from "../views/dashboard/CategoriaUpdate.vue";
import TipoVehiculoUpdate from "../views/dashboard/TipoVehiculoUpdate.vue";
import ModeloUpdate from "../views/dashboard/ModeloUpdate.vue";
import MarcaVehiculo from "../views/dashboard/MarcaVehiculo.vue";
import SolicitudPersonalizacion from "../views/dashboard/SolicitudPersonalizacion.vue";
import NewMarcaVehiculo from "../views/dashboard/NewMarcaVehiculo.vue";
import NewTipoVehiculo from "../views/dashboard/NewTipoVehiculo.vue";
import MarcaVehiculoUpdate from "../views/dashboard/MarcaVehiculoUpdate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homeview",
      component: HomeView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/productos",
      component: ProductsView,
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: "/:categoria",
          name: "productosview",
          component: ProductFilter,
        },
      ],
    },
    {
      path: "/productos/:id",
      name: "productoview",
      component: ProductView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/productos/add",
      name: "addproductoview",
      component: AddView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/productos/:id/edit",
      name: "updateproductoview",
      component: UpdateView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/contacto",
      name: "contactview",
      component: ContactView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/login",
      name: "loginview",
      component: LoginView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/register",
      name: "registerview",
      component: RegisterView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: ForgotPassword,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/auth/dashboard",
      name: "productdashboard",
      component: ProductDashboard,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/personalizacion",
      name: "productopersonalizacion",
      component: PersonalizacionView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/pedido",
      name: "carritodecompras",
      component: CompraView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/auth/categorias",
      name: "categorias",
      component: CategoriaDashboard,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/auth/modelosvehiculo",
      name: "modelosvehiculo",
      component: ModeloVehiculo,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/auth/listaCategorias",
      name: "listaCategorias",
      component: ListaCategorias,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/auth/listaTiposVehiculo",
      name: "listaTiposVehiculo",
      component: TiposVehiculo,
      meta: {
        requireAuth: true,
      },
    },

    {
      path: "/auth/listaModelosVehiculo",
      name: "listaModelosVehiculo",
      component: ModelosVehiculo,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/auth/categorias/:id/edit",
      name: "categoriaupdate",
      component: CategoriaUpdate,
      meta: {
        requireAuth: true,
      },
    }
    ,
    {
      path: "/auth/tipovehiculo/:id/edit",
      name: "tipoVehiculoUpdate",
      component: TipoVehiculoUpdate,
      meta: {
        requireAuth: true,
      },
    },

    {
      path: "/auth/marca/:id/edit",
      name: "marcaloUpdate",
      component: MarcaVehiculoUpdate,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/auth/modelovehiculo/:id/edit",
      name: "modeloVehiculoUpdate",
      component: ModeloUpdate,
      meta: {
        requireAuth: true,
      },
    }
    ,
    {
      path: "/auth/marcasvehiculos",
      name: "marcasvehiculos",
      component: MarcaVehiculo,
      meta: {
        requireAuth: true,
      },
    }
    ,
    {
      path: "/auth/personalizaciones",
      name: "personalizaciones",
      component: SolicitudPersonalizacion,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/auth/marcaVehiculo/new",
      name: "newMarcaVehiculo",
      component: NewMarcaVehiculo,
      meta: {
        requireAuth: true,
      },
    }
    ,
    {
      path: "/auth/tipoVehiculo/new",
      name: "newTipoVehiculo",
      component: NewTipoVehiculo,
      meta: {
        requireAuth: true,
      },
    }
  ],
});
router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const auth = store.getJwt != "";
  const needAuth = to.meta.requireAuth;
  if (needAuth && !auth) {
    next("/login");
  }
  next();
});
export default router;
