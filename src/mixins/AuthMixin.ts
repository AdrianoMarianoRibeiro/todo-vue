import { Vue, Component } from "vue-property-decorator";
import AuthService from "@/services/AuthService";

interface User {
  id: string;
  name?: string;
  email: string;
}

@Component
export default class AuthMixin extends Vue {
  // Computed properties
  get isAuthenticated(): boolean {
    return AuthService.isAuthenticated();
  }

  get currentUser(): User | null {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        return JSON.parse(userData) as User;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Methods
  async checkAuth(): Promise<boolean> {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
      return false;
    }
    return true;
  }

  async refreshUserData(): Promise<User | null> {
    try {
      const userData = await AuthService.me();
      localStorage.setItem("user_data", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      return null;
    }
  }
}
