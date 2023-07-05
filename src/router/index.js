import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tasks from '../views/distribution/Tasks.vue'
import Sprints from '../views/sprint/Sprints.vue'
import Tests from '../views/test/Tests.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Roadmap from '../views/Roadmap.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
    // component: () => import('../views/Tasks.vue')
  },
  {
    path: '/sprints',
    name: 'Sprints',
    component: Sprints
  },
  {
    path: '/tests',
    name: 'Tests',
    component: Tests
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: Roadmap
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
