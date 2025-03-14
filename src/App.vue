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
    <footer>
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} <a :href="origin" class="button button-clear">{{ brandName }}</a></p>
      </div>
    </footer>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  background-color: #f0f2f5;
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

footer {
  text-align: center;
  padding: 15px 0;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
}

footer .button-clear {
  color: #4361ee;
  font-weight: bold;
  margin: 0;
  padding: 0;
  height: auto;
}

footer .button-clear:hover {
  text-decoration: underline;
}
</style>
