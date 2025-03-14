# Personal URL Shortener

A simple, personal URL shortener that allows you to create short URLs for your favorite websites. This application is built with Vue.js and uses Milligram CSS for styling.

## Features

- Clean, minimalist interface
- Redirects to original URLs with a smooth transition
- Loads URL mappings from a GitHub repository
- Caches GitHub responses for better performance
- Falls back to local data if GitHub is unavailable
- Configurable settings

## How It Works

1. The application loads URL mappings from a GitHub repository
2. When you visit a URL like `yourdomain.com/gh`, it looks up the shortcode in the URL mappings
3. If found, it displays a brief redirection message and then redirects to the original URL
4. If not found, it displays an error message

## Setup

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a GitHub repository to store your URL mappings
4. Create a `urls.json` file in your GitHub repository with the following format:

```json
{
  "urls": {
    "gh": "https://github.com",
    "yt": "https://youtube.com",
    "gm": "https://gmail.com"
  }
}
```

5. Update the `GITHUB_JSON_URL` in `src/config.js` to point to your GitHub repository
6. Build and deploy the application

## Configuration

You can configure the application by editing the `src/config.js` file:

```javascript
// GitHub repository URL for the URLs JSON file
export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/yourusername/url-shortener-urls/main/urls.json';

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
```

## Deployment

1. Build the application with `npm run build`
2. Deploy the contents of the `dist` directory to your web server
3. Configure your web server to redirect all requests to `index.html`

## License

MIT
