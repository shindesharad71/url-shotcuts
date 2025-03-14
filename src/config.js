/**
 * Application Configuration
 */

// GitHub repository URL for the URLs JSON file
// Replace with your actual GitHub username and repository
export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/shindesharad71/url-shotcuts/master/src/assets/urls.json';

// Redirection delay in milliseconds
export const REDIRECT_DELAY = 1500;

// Default application settings
export const DEFAULT_SETTINGS = {
  // Whether to use GitHub as the primary source for URLs
  useGithub: true,
  // Whether to use localStorage as a fallback
  useLocalStorageFallback: true,
  // Whether to cache GitHub responses
  cacheGithubResponses: true,
  // Cache expiration time in milliseconds (1 hour)
  cacheExpirationTime: 60 * 60 * 1000
}; 