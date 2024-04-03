import { createRouter, createWebHistory } from 'vue-router'
import { useAuthServices } from '../composables/useAuthServices'

const routes = [
  {
      path: '/',
      component: () => import('@/layouts/default/Default.vue'),
      children: [
        {
          path: '/',
          meta: { requiresAuth: true } ,
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

  router.beforeEach((to, from, next) => {
    const authServices = useAuthServices();
    const isAuthenticated = authServices.checkAuth()
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        // Redirect to login page if unauthenticated
        next('/login')
      } else {
        next(); // Continue navigation
      }
    } else {
      next(); // Continue navigation for routes that don't require authentication
    }
  });

  export default router