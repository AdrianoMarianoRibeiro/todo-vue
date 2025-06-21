import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/UserManagement.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("@/views/PostManagement.vue"),
  },
];

const router = new VueRouter({
  mode: "history", // Esta linha remove o hash da URL
  base: process.env.BASE_URL,
  routes,
});

export default router;
