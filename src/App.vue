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
      <UrlShortener :brandName="brandName" :origin="origin" />
    </div>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  background-color: #121212;
  color: #e0e0e0;
}

.container {
  height: 100%;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Override Milligram styles for dark theme */
a {
  color: #738adb;
}

code {
  background-color: #2a2a2a;
  color: #ff79c6;
}

button.button-clear {
  color: #738adb;
}

.creator {
  font-size: 0.9rem;
  color: #999;
  margin-top: 1rem;
}

.creator a {
  color: #738adb;
  text-decoration: none;
}

.creator a:hover {
  text-decoration: underline;
}
</style>
