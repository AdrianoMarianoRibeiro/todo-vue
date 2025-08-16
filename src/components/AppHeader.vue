<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>
    
    <v-toolbar-title>Sistema de Gestão</v-toolbar-title>
    
    <v-spacer></v-spacer>

    <!-- Informações do usuário -->
    <template v-if="user">
      <v-chip class="mr-4" color="white" text-color="primary">
        <v-avatar left>
          <v-icon>mdi-account</v-icon>
        </v-avatar>
        {{ user.name || user.email }}
      </v-chip>
    </template>

    <!-- Menu do usuário -->
    <v-menu bottom left offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon color="red">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Dialog de confirmação de logout -->
    <v-dialog v-model="logoutDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Confirmar Logout
        </v-card-title>
        
        <v-card-text>
          Tem certeza que deseja sair do sistema?
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="logoutDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="red" text @click="confirmLogout" :loading="loggingOut">
            Sair
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'AppHeader',

  data() {
    return {
      user: null,
      logoutDialog: false,
      loggingOut: false,
    };
  },

  created() {
    this.loadUserData();
  },

  methods: {
    loadUserData() {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (e) {
          console.error('Erro ao parsear dados do usuário:', e);
          this.user = null; // Reset user state on error
        }
      } else {
        this.user = null; // Handle case where no user data exists
      }
    },

    logout() {
      this.logoutDialog = true;
    },

    async confirmLogout() {
      this.loggingOut = true;
      try {
        // Call logout API (optional)
        await AuthService.logout();

        // Remove local data
        AuthService.removeToken();
        localStorage.removeItem('user_data');
        this.user = null; // Reset user state

        // Redirect to login
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        // Optionally notify user of error (e.g., show a toast)
        // Example: this.$toast.error('Erro ao fazer logout. Dados locais foram limpos.');
        
        // Still proceed with local cleanup and redirect
        AuthService.removeToken();
        localStorage.removeItem('user_data');
        this.user = null;
        this.$router.push('/login');
      } finally {
        this.loggingOut = false;
        this.logoutDialog = false;
      }
    },
  },
};
</script>