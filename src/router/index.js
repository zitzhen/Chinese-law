import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/index.vue'
import all_law from '@/views/all-law/index.vue'

const routes = [
    { 
        path:'/',
        name:'Home',
        component:Home
    },
    {
      path :"/all-law",
      name:'law',
      component:all_law
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
