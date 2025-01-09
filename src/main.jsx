import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import axios from "axios";
import { notification } from "antd";

notification.config({
  placement: "bottomRight",
});

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");
  if (authToken && !config?.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (r) => r,
  (error) => {
    console.log("Request error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
