import router from "@/router";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.BASE_URL_API || "http://localhost:3000/",
});

// Interceptor para adicionar o token automaticamente
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    console.log("🔍 Debug Token:", {
      token: token ? `${token.substring(0, 20)}...` : "NULL",
      hasToken: !!token,
      url: config.url,
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e erros de autenticação
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber 401 (Unauthorized), remove o token e redireciona para login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      delete API.defaults.headers.common["Authorization"];

      // Só redireciona se não estiver já na página de login
      if (router.currentRoute.path !== "/login") {
        router.push("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default API;
