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
import Unauthorized from "../views/auth/Unauthorized.vue";
import Forbidden from "../views/auth/Forbidden.vue";
import NotFound from "../views/auth/NotFound.vue";
import MainDasboard from "../views/dashboard/client/MainDashboard.vue";
import ProveedorLista from "../views/dashboard/ProveedorLista.vue";
import AddSupplier from "../views/dashboard/AddSupplier.vue";
import UpdateInfo from "../views/dashboard/client/UpdateInfo.vue";
import Material from "../views/dashboard/Material.vue";
import SupplierUpdate from "../views/dashboard/SupplierUpdate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/client/dashboard/updateinfo",
      name: "updateinfo",
      component: UpdateInfo,
      meta: {
        requireAuth: true,
        roles: ["Client"],
      },
    },
    {
      path: '/:pathMatch(.*)*', // Ruta comodín para capturar todas las rutas no definidas
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: "/client/dashboard",
      name: "dashboard",
      component: MainDasboard,
      meta: {
        requireAuth: true,
        roles: ["Client"],
      },
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: Forbidden,
      meta: {
        requireAuth: true,
        roles: ["Client"],
      },
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: Unauthorized,
      meta: {
        requireAuth: false,
        roles: ["User"],
      },
    },
    {
      path: "/notfound",
      name: "notfound",
      component: NotFound,
      meta: {
        requireAuth: false,
      },
    },
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
      name: "productsviewbase",
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: "/productos/:categoria",
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
        requireAuth: true,
        roles: ["Admin"],
      },
    },
    {
      path: "/productos/:id/edit",
      name: "updateproductoview",
      component: UpdateView,
      meta: {
        requireAuth: true,
        roles: ["Admin"],
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
        isAuthenticated: true,
        requireAuth: false,
        roles: ["User"],
      },
    },
    {
      path: "/register",
      name: "registerview",
      component: RegisterView,
      meta: {
        isAuthenticated: true,
        requireAuth: false,
        roles: ["User"],
      },
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: ForgotPassword,
      meta: {
        isAuthenticated: true,
        requireAuth: false,
        roles: ["User"],
      },
    },
    {
      path: "/auth/dashboard",
      name: "productdashboard",
      component: ProductDashboard,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/personalizacion",
      name: "productopersonalizacion",
      component: PersonalizacionView,
      meta: {
        requireAuth: true,
        roles: ["Client"],
      },
    },
    {
      path: "/pedido",
      name: "carritodecompras",
      component: CompraView,
      meta: {
        requireAuth: true,
        roles: ["Client"],
      },
    },
    {
      path: "/auth/categorias",
      name: "categorias",
      component: CategoriaDashboard,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/modelosvehiculo",
      name: "modelosvehiculo",
      component: ModeloVehiculo,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/listaCategorias",
      name: "listaCategorias",
      component: ListaCategorias,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/listaTiposVehiculo",
      name: "listaTiposVehiculo",
      component: TiposVehiculo,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },

    {
      path: "/auth/listaModelosVehiculo",
      name: "listaModelosVehiculo",
      component: ModelosVehiculo,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/categorias/:id/edit",
      name: "categoriaupdate",
      component: CategoriaUpdate,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/tipovehiculo/:id/edit",
      name: "tipoVehiculoUpdate",
      component: TipoVehiculoUpdate,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },

    {
      path: "/auth/marca/:id/edit",
      name: "marcaloUpdate",
      component: MarcaVehiculoUpdate,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/modelovehiculo/:id/edit",
      name: "modeloVehiculoUpdate",
      component: ModeloUpdate,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/marcasvehiculos",
      name: "marcasvehiculos",
      component: MarcaVehiculo,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/personalizaciones",
      name: "personalizaciones",
      component: SolicitudPersonalizacion,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/materiales",
      name: "materiales",
      component: Material,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/marcaVehiculo/new",
      name: "newMarcaVehiculo",
      component: NewMarcaVehiculo,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/tipoVehiculo/new",
      name: "newTipoVehiculo",
      component: NewTipoVehiculo,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/proveedores",
      name: "proveedores",
      component: ProveedorLista,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/proveedores/new",
      name: "newProveedor",
      component: AddSupplier,
      meta: {
        roles: ["Admin"],
        requireAuth: true,
      },
    },
    {
      path: "/auth/proveedores/:id/editar",
      name: "supplierUpdate",
      component: SupplierUpdate,
      meta:{
        roles: ["Admin"],
        requireAuth: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const auth = store.getJwt != "";
  const needAuth = to.meta.requireAuth;
  const userRole = store.getUserRole;
  const roles = to.meta.roles;

  if (needAuth && !auth) {
    next("/login");
  } else if(to.meta.isAuthenticated && auth) {
    next("/");
  }else if (needAuth && auth && roles && !roles.includes(userRole)){
    next("/unauthorized");
  }
  else{
    next();
  }

});
export default router;
