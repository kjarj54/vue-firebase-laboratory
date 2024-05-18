import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";


const requireAuth = async (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  const userStore = useUserStore();
  try {
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    userStore.loadingSession = false;
    if (user) {
      next();
    } else {
      next("/login");
    }
  } catch (error) {
    userStore.loadingSession = false;
    next("/login");
  }
};

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
