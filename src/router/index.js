import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: "/custom-roc-date-picker", name: "Index", component: () => import("@/pages/Index.vue")}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router