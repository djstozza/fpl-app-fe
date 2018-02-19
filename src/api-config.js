let hostname;
let backendHost;
let cable;
const apiVersion = 'v1';

if (window.location.hostname === "localhost") {
  hostname = 'localhost:3001'
  backendHost = `http://${hostname}`;
  cable = `ws://${hostname}`
} else if (window.location.hostname === "fpl-app-fe.herokuapp.com") {
  hostname = 'fpl-app-api.herokuapp.com'
  backendHost = `https://${hostname}`;
  cable = `wss://${hostname}`
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
export const CABLE_CONNECTION = `${cable}/cable`
