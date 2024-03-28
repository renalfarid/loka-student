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
  {
    path: '/login',
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
},
  {
    path: '/signup',
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue'),
      },
    ],
},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router