let backendHost;
const apiVersion = 'v1';

if (window.location.hostname === "localhost") {
  backendHost = 'http://localhost:3001';
} else if (window.location.hostname === "fpl-app-fe.herokuapp.com") {
  backendHost = 'https://fpl-app-api.herokuapp.com';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
