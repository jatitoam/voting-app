// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './assets/tailwind.css'; // Import Tailwind CSS

createApp(App).use(router).mount('#app');