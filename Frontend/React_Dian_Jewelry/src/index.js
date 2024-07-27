import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "sonner";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import App from "./views/App.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
const clientID =
  "374623551533-533imfs37lv4u9ekca190vramifjp7h2.apps.googleusercontent.com";
root.render(
  // <React.StrictMode>
  <>
    <Toaster
      richColors
      position="top-right"
      closeButton={true}
      duration={3000}
      transition
      animation="bounce"
    />
    <GoogleOAuthProvider clientId={clientID}>
      <App />
    </GoogleOAuthProvider>
  </>

  // </React.StrictMode>
);
reportWebVitals();
