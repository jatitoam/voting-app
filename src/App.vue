<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Mejores clases TIC</h1>
    </header>
    <main class="p-4">
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
};
</script>

<style>
/* Remove existing styles if any */
</style>