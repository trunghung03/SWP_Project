import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App.js';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const root = ReactDOM.createRoot(document.getElementById('root'));
const clientID =
    "374623551533-533imfs37lv4u9ekca190vramifjp7h2.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={clientID}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
