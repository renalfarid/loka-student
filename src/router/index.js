import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
          {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
          },
        ],
      },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router