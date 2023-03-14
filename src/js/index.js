import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app"
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryString = window.location.search;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
