import React, { useState, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import history from 'state/history'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}

import store from 'state/configureStore'
const element = document.getElementById('root')

if (element) {
  const root = createRoot(element)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <CustomRouter history={history}>
          <App />
        </CustomRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found")
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
