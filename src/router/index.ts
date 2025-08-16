import AuthService from "@/services/AuthService";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true }, // Só pode acessar se não estiver logado
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/UserManagement.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("@/views/PostManagement.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Guard de navegação para proteger rotas
router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated();

  // Se a rota requer autenticação e o usuário não está logado
  if (to.meta?.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  // Se a rota é só para visitantes (como login) e o usuário já está logado
  if (to.meta?.requiresGuest && isAuthenticated) {
    next("/");
    return;
  }

  next();
});

// Inicializa o token do AuthService quando a aplicação carrega
AuthService.initializeToken();

export default router;
