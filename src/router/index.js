import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';  // Updated import path

const routes = [
  {
    path: '/',
    name: 'HomePage',  // Ensure this matches the component name
    component: HomePage
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
