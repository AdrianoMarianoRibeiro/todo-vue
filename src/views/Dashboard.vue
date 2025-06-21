<template>
  <v-app>
    <AppSidebar />
    <AppHeader />
    <v-main>
      <v-container fluid class="pa-6">
        <!-- Header do Dashboard -->
        <v-row class="mb-6">
          <v-col cols="12">
            <div class="text-center">
              <v-avatar size="80" color="primary" class="mb-4">
                <v-icon size="40" color="white">mdi-post</v-icon>
              </v-avatar>
              <h1 class="display-1 font-weight-bold primary--text mb-2">
                Sistema de Gerenciamento
              </h1>
              <h2 class="headline grey--text text--darken-2 mb-4">
                Usuários & Posts
              </h2>
              <p class="body-1 grey--text text--darken-1 mx-auto" style="max-width: 600px;">
                Plataforma completa para gerenciar usuários e suas publicações. 
                Crie, edite e organize posts de forma simples e eficiente.
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- Cards de Estatísticas -->
        <v-row class="mb-6">
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-4" elevation="4" color="primary" dark>
              <v-icon size="40" class="mb-3">mdi-account-group</v-icon>
              <div class="headline font-weight-bold">{{ stats.totalUsers }}</div>
              <div class="body-2">Total de Usuários</div>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-4" elevation="4" color="success" dark>
              <v-icon size="40" class="mb-3">mdi-account-check</v-icon>
              <div class="headline font-weight-bold">{{ stats.activeUsers }}</div>
              <div class="body-2">Usuários Ativos</div>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-4" elevation="4" color="info" dark>
              <v-icon size="40" class="mb-3">mdi-post</v-icon>
              <div class="headline font-weight-bold">{{ stats.totalPosts }}</div>
              <div class="body-2">Total de Posts</div>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-4" elevation="4" color="orange" dark>
              <v-icon size="40" class="mb-3">mdi-calendar-today</v-icon>
              <div class="headline font-weight-bold">{{ stats.postsToday }}</div>
              <div class="body-2">Posts Hoje</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Seção de Funcionalidades -->
        <v-row class="mb-6">
          <v-col cols="12">
            <h2 class="headline font-weight-bold mb-4 text-center">
              <v-icon large color="primary" class="mr-2">mdi-feature-search</v-icon>
              Funcionalidades do Sistema
            </h2>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card elevation="3" class="h-100">
              <v-card-title class="primary white--text">
                <v-icon color="white" class="mr-2">mdi-account-cog</v-icon>
                Gerenciamento de Usuários
              </v-card-title>
              <v-card-text class="pa-4">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Criar novos usuários</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Editar informações pessoais</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Ativar/Desativar usuários</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Excluir usuários</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" router to="/user" outlined>
                  <v-icon left>mdi-account-group</v-icon>
                  Gerenciar Usuários
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card elevation="3" class="h-100">
              <v-card-title class="info white--text">
                <v-icon color="white" class="mr-2">mdi-post-outline</v-icon>
                Gerenciamento de Posts
              </v-card-title>
              <v-card-text class="pa-4">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Criar novos posts</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Editar conteúdo dos posts</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Associar posts a usuários</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Excluir posts</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="info" router to="/post" outlined>
                  <v-icon left>mdi-post</v-icon>
                  Gerenciar Posts
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Ações Rápidas -->
        <v-row class="mb-6">
          <v-col cols="12">
            <h2 class="headline font-weight-bold mb-4 text-center">
              <v-icon large color="primary" class="mr-2">mdi-flash</v-icon>
              Ações Rápidas
            </h2>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card class="text-center pa-6" elevation="3" hover>
              <v-icon size="60" color="primary" class="mb-4">mdi-account-plus</v-icon>
              <h3 class="title mb-3">Novo Usuário</h3>
              <p class="body-2 grey--text mb-4">
                Adicione um novo usuário ao sistema
              </p>
              <v-btn color="primary" large block router to="/user">
                <v-icon left>mdi-plus</v-icon>
                Criar Usuário
              </v-btn>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card class="text-center pa-6" elevation="3" hover>
              <v-icon size="60" color="info" class="mb-4">mdi-plus-box</v-icon>
              <h3 class="title mb-3">Novo Post</h3>
              <p class="body-2 grey--text mb-4">
                Crie uma nova publicação
              </p>
              <v-btn color="info" large block router to="/post">
                <v-icon left>mdi-plus</v-icon>
                Criar Post
              </v-btn>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card class="text-center pa-6" elevation="3" hover>
              <v-icon size="60" color="success" class="mb-4">mdi-view-dashboard</v-icon>
              <h3 class="title mb-3">Relatórios</h3>
              <p class="body-2 grey--text mb-4">
                Visualize estatísticas do sistema
              </p>
              <v-btn color="success" large block disabled>
                <v-icon left>mdi-chart-line</v-icon>
                Em Breve
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Footer Informativo -->
        <v-row>
          <v-col cols="12">
            <v-card class="text-center pa-6" color="grey lighten-5" flat>
              <v-icon size="40" color="primary" class="mb-3">mdi-information</v-icon>
              <h3 class="title mb-3">Sistema em Desenvolvimento</h3>
              <p class="body-1 grey--text text--darken-2">
                Este é um sistema de demonstração para gerenciamento de usuários e posts.
                <br>
                Desenvolvido com Vue.js, Vuetify e TypeScript.
              </p>
              <v-chip-group class="justify-center mt-3">
                <v-chip color="primary" outlined>Vue.js</v-chip>
                <v-chip color="info" outlined>Vuetify</v-chip>
                <v-chip color="success" outlined>TypeScript</v-chip>
                <v-chip color="orange" outlined>REST API</v-chip>
              </v-chip-group>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService';
import PostService from '@/services/PostService';
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'Dashboard',

  components: {
    AppSidebar,
    AppHeader
  },

  data() {
    return {
      stats: {
        totalUsers: 0,
        activeUsers: 0,
        totalPosts: 0,
        postsToday: 0
      },
      loading: false
    };
  },

  created() {
    this.loadStats();
  },

  methods: {
    async loadStats() {
      this.loading = true;
      try {
        // Carregar estatísticas de usuários
        const usersResponse = await UserService.findAll();
        const users = usersResponse.items || [];
        this.stats.totalUsers = usersResponse.meta.itemCount || users.length;
        this.stats.activeUsers = users.filter(user => user.status).length;

        // Carregar estatísticas de posts
        const postsResponse = await PostService.findAll(1, 1000); // Pegar todos os posts para contar
        const posts = postsResponse.items || [];
        this.stats.totalPosts = posts.length;
        
        // Contar posts de hoje
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        this.stats.postsToday = posts.filter(post => {
          const postDate = new Date(post.createdAt).toISOString().split('T')[0];
          return postDate === todayString;
        }).length;

      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.v-card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

.v-chip-group {
  justify-content: center;
}
</style>