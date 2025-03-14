<script setup>
import UrlShortener from './components/UrlShortener.vue'
import { ref, onMounted } from 'vue'

// Initialize with empty values
const origin = ref('');
const brandName = ref('URL Shortener');

// Set up values after component is mounted
onMounted(() => {
  origin.value = window.location.origin;
  const hostname = window.location.hostname;
  brandName.value = hostname === 'localhost' ? 'Personal URL Shortener' : hostname;
});
</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <UrlShortener />
    </div>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  background-color: #ffffff;
  color: #333333;
}

.container {
  height: 100%;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
}
</style>
