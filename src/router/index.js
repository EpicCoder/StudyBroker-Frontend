import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true,
        noHeader: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false,
        noHeader: true,
      },
    },
    {
      path: "/exchange",
      name: "exchange",
      component: () => import("../views/ExchangeView.vue"),
      meta: {
        requiresAuth: true,
        noHeader: false,
      },
    },
    {
      path: "/transactions",
      name: "transactions",
      component: () => import("../views/TransactionsView.vue"),
      meta: {
        requiresAuth: true,
        noHeader: false,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundView.vue"),
      meta: {
        requiresAuth: false,
        noHeader: true,
      },
    },
  ],
  linkActiveClass: "active",
});

router.beforeEach(async (to, from) => {
  let isAuth = false;

  try {
    const response = await axios.get(import.meta.env.VITE_BASE_API + "/auth", {
      withCredentials: true,
    });
    isAuth = response.data.authenticated;
  } catch (error) {
    console.log("Login issue!");
  }

  if (to.meta.requiresAuth && !isAuth && to.name !== "login") {
    return { name: "login" };
  } else if (isAuth && to.name === "login") {
    return { name: "home" };
  }
});

export default router;
