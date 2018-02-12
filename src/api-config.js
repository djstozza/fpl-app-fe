let backendHost;
const apiVersion = 'v1';

if (process.env.NODE_ENV === 'development') {
  backendHost = 'http://localhost:3001';
} else if (process.env.NODE_ENV === 'production') {
  backendHost = 'https://fpl-app-api.com';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
