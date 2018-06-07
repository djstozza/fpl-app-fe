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
  cable = `wss://${hostname}`;
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
export const CABLE_CONNECTION = `${cable}/cable`;

export function setLocalStorageHeader (res) {
  let accessToken;
  let expiry;

  if (res.status === 401) {
    return removeLocalStorageHeader();
  }

  if (res.headers['access-token'] !== "") {
    accessToken = res.headers['access-token'];
    expiry = res.headers['expiry'];
  } else {
    accessToken = res.config.headers['access-token'];
    expiry = res.config.headers['expiry'];
  }

  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('client', res.headers['client']);
  localStorage.setItem('token-type', res.headers['token-type']);
  localStorage.setItem('expiry', expiry);
  localStorage.setItem('uid', res.headers['uid']);
  localStorage.setItem('content-type', res.headers['content-type']);
}

export function getLocalStorageHeader () {
  return  {
    headers: {
      'access-token': localStorage.getItem('access-token'),
      'client': localStorage.getItem('client'),
      'token-type': localStorage.getItem('token-type'),
      'expiry': localStorage.getItem('expiry'),
      'uid': localStorage.getItem('uid'),
      'content-type': localStorage.getItem('content-type'),
    }
  };
}

export function removeLocalStorageHeader () {
  localStorage.removeItem('access-token');
  localStorage.removeItem('client');
  localStorage.removeItem('token-type');
  localStorage.removeItem('expiry');
  localStorage.removeItem('uid');
  localStorage.removeItem('content-type');
}

export const loggedIn = localStorage.getItem('access-token') ? true : false;
