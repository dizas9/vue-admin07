import { createRouter, createWebHistory } from "vue-router";
import ProductListView from "@/views/ProductListView.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ProductListView,
    },
    {
      path: "/Dashboard",
      name: "dashboard",
      component: DashboardLayout,
      children:[
        {
          path:"",
          component:AdminPanelView,
        }
      ]
    },
  ],
});

export default router;
