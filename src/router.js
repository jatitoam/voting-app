// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import EmptyView from './views/EmptyView.vue';
import VotacionTicGal from './views/VotacionTicGal.vue';

const routes = [
  {
    path: "/",
    component: EmptyView,
  },
  {
    path: "/votacion",
    component: VotacionTicGal,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;