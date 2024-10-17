import { createRouter, createWebHistory } from "vue-router";
import ProductListView from "@/views/ProductListView.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import LoginPageView from "@/views/LoginPageView.vue";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginPageView,
    },
    {
      path: "/Dashboard",
      name: "dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "",
          component: AdminPanelView,
        },
      ],
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get("accessToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
