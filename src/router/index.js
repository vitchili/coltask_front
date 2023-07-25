import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tasks from '../views/distribution/Tasks.vue'
import CreateTask from '../views/distribution/CreateTask.vue'
import EditTask from '../views/task/EditTask.vue'
import Sprints from '../views/sprint/Sprints.vue'
import Tests from '../views/test/Tests.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Dashboard from '../views/Dashboard.vue'
import Roadmap from '../views/Roadmap.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/task/new',
    name: 'CreateTask',
    component: CreateTask,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/task/edit/:id',
    name: 'EditTask',
    component: EditTask,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sprints',
    name: 'Sprints',
    component: Sprints,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tests',
    name: 'Tests',
    component: Tests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: Roadmap,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
