<script setup>
import { ref, onMounted } from 'vue';
import urlsData from '../assets/urls.json';
import { GITHUB_JSON_URL, REDIRECT_DELAY, DEFAULT_SETTINGS } from '../config';

// Props from parent
const props = defineProps({
  brandName: String,
  origin: String
});

// State
const urls = ref({});
const baseUrl = ref('');
const isRedirecting = ref(false);
const redirectUrl = ref('');
const redirectCode = ref('');
const isLoading = ref(true);
const error = ref(null);

// Cache key for GitHub URLs
const GITHUB_CACHE_KEY = 'github_urls_cache';

// Fetch URLs from GitHub with caching
async function fetchUrlsFromGithub() {
  try {
    // Check cache first if enabled
    if (DEFAULT_SETTINGS.cacheGithubResponses) {
      const cachedData = localStorage.getItem(GITHUB_CACHE_KEY);
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        // Check if cache is still valid
        if (Date.now() - timestamp < DEFAULT_SETTINGS.cacheExpirationTime) {
          console.log('Using cached GitHub URLs');
          return data;
        }
      }
    }

    // Fetch fresh data
    const response = await fetch(GITHUB_JSON_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch URLs: ${response.status}`);
    }
    const data = await response.json();
    
    // Cache the response if enabled
    if (DEFAULT_SETTINGS.cacheGithubResponses) {
      localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data.urls || {}
      }));
    }
    
    return data.urls || {};
  } catch (err) {
    console.error('Error fetching URLs from GitHub:', err);
    error.value = 'Failed to load URLs from GitHub. Using local data instead.';
    // Fallback to local data
    return urlsData.urls || {};
  } finally {
    isLoading.value = false;
  }
}

// Load URLs on component mount
onMounted(async () => {
  // Set the base URL
  baseUrl.value = window.location.origin;
  
  // First check for path in URL for redirection
  const path = window.location.pathname;
  if (path && path !== '/') {
    const code = path.substring(1); // Remove leading slash
    redirectCode.value = code;
    
    try {
      let urlsToUse = {};
      
      // Try to get from localStorage if enabled
      if (DEFAULT_SETTINGS.useLocalStorageFallback) {
        const savedUrls = localStorage.getItem('shortUrls');
        if (savedUrls) {
          urlsToUse = JSON.parse(savedUrls);
        }
      }
      
      // Fetch URLs from GitHub if enabled
      if (DEFAULT_SETTINGS.useGithub) {
        const githubUrls = await fetchUrlsFromGithub();
        // Merge URLs with priority to localStorage
        urlsToUse = { ...githubUrls, ...urlsToUse };
      } else if (Object.keys(urlsToUse).length === 0) {
        // If GitHub is disabled and no localStorage, use local data
        urlsToUse = urlsData.urls || {};
      }
      
      urls.value = urlsToUse;
      
      // Check if the code exists in our URLs
      const originalUrl = urls.value[code];
      if (originalUrl) {
        // Show redirection message
        isRedirecting.value = true;
        redirectUrl.value = originalUrl;
        
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = originalUrl;
        }, REDIRECT_DELAY);
        return;
      } else {
        error.value = `No URL found for shortcode: ${code}`;
      }
    } catch (err) {
      console.error('Error during redirection:', err);
      error.value = 'Failed to process redirection.';
    } finally {
      isLoading.value = false;
    }
  } else {
    // Just load the URLs for the homepage
    if (DEFAULT_SETTINGS.useGithub) {
      urls.value = await fetchUrlsFromGithub();
    } else {
      urls.value = urlsData.urls || {};
      isLoading.value = false;
    }
  }
});
</script>

<template>
  <div class="content">
    <div v-if="isRedirecting">
      <div class="spinner"></div>
      <h1>🚀 Redirecting...</h1>
      <p>
        <code>{{ redirectCode }}</code> → <a :href="redirectUrl" class="button button-clear">{{ redirectUrl }}</a>
      </p>
    </div>
    <div v-else-if="isLoading">
      <div class="spinner"></div>
      <h2>⏳ Loading...</h2>
    </div>
    <div v-else>
      <h1>🔗 Personal URL Shortcuts</h1>
      <p class="creator">
        Created by <a href="https://shrd.in" target="_blank" rel="noopener noreferrer">Sharad</a>
      </p>
      <p>
        A simple URL shortener for quick access to your favorite websites.
        <br>
        Use the format: <code>{{ baseUrl }}/shortcode</code> ✨
      </p>
      <div v-if="error" class="error-message">
        ❌ {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  text-align: center;
  max-width: 60rem;
  padding: 2rem;
}

h1, h2 {
  color: #e0e0e0;
}

p {
  color: #b0b0b0;
}

.creator {
  font-size: 1rem;
  color: #999;
  margin-top: 0;
  margin-bottom: 2rem;
}

.spinner {
  border: 0.4rem solid rgba(255, 255, 255, 0.1);
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border-left-color: #738adb;
  animation: spin 1s linear infinite;
  margin: 0 auto 2rem;
}

.error-message {
  color: #ff6b6b;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.4rem;
  background-color: rgba(255, 107, 107, 0.1);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 