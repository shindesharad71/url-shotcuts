/**
 * Application Configuration
 * 
 * URL Lookup Order:
 * 1. Local Storage (if enabled)
 * 2. Local urls.json file
 * 3. GitHub (if enabled and not found locally)
 */

// GitHub repository URL for the URLs JSON file
// Replace with your actual GitHub username and repository
export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/shindesharad71/url-shotcuts/refs/heads/master/src/assets/urls.json';

// Redirection delay in milliseconds
export const REDIRECT_DELAY = 50;

// Default application settings
export const DEFAULT_SETTINGS = {
  // Whether to use GitHub as a fallback when URL is not found locally
  useGithub: true,
  // Whether to check localStorage first
  useLocalStorageFallback: true,
  // Whether to cache GitHub responses
  cacheGithubResponses: true,
  // Cache expiration time in milliseconds (1 hour)
  cacheExpirationTime: 60 * 60 * 1000
}; 
