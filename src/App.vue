<!-- src/App.vue -->
<template>
  <div id="app" :class="themeClass" class="min-h-screen">
    <header class="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Mejores clases TIC</h1>
      <button @click="toggleThemeMode" class="text-gray-900 dark:text-white">
        {{ themeIcon }}
      </button>
    </header>
    <main class="p-4 bg-gray-100 dark:bg-gray-900">
      <TheVoting />
    </main>
  </div>
</template>

<script>
import TheVoting from "./components/TheVoting.vue";
export default {
  name: "App",
  components: {
    TheVoting,
  },
  data() {
    return {
      themeMode: 'system', // 'light', 'dark', or 'system'
    };
  },
  computed: {
    themeClass() {
      if (this.themeMode === 'light') return '';
      if (this.themeMode === 'dark') return 'dark';
      // For 'system', match the system preference
      return this.systemPrefersDark ? 'dark' : '';
    },
    systemPrefersDark() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    themeIcon() {
      if (this.themeMode === 'light') return '🌞';
      if (this.themeMode === 'dark') return '🌙';
      return '🖥️'; // System preference icon
    },
  },
  methods: {
    toggleThemeMode() {
      if (this.themeMode === 'light') {
        this.themeMode = 'dark';
      } else if (this.themeMode === 'dark') {
        this.themeMode = 'system';
      } else {
        this.themeMode = 'light';
      }
    },
  },
  mounted() {
    // Set the initial theme based on system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.themeMode = 'system';
    } else {
      this.themeMode = 'system';
    }
  },
  watch: {
    themeMode() {
      // Force the class to update
      document.documentElement.classList.toggle('dark', this.themeClass === 'dark');
    },
  },
};
</script>

<style>
</style>
