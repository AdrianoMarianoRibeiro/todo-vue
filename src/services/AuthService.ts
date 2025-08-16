import API from "@/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await API.post("auth/login", payload);
    return response.data;
  },

  async logout(): Promise<void> {
    await API.post("auth/logout");
  },

  async me(): Promise<any> {
    const response = await API.get("auth/me");
    return response.data;
  },

  // Métodos para gerenciar o token
  setToken(token: string): void {
    localStorage.setItem("auth_token", token);
    // Adiciona o token ao header padrão do axios
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  removeToken(): void {
    localStorage.removeItem("auth_token");
    delete API.defaults.headers.common["Authorization"];
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  },

  // Inicializa o token se existir no localStorage
  initializeToken(): void {
    const token = this.getToken();
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
};
