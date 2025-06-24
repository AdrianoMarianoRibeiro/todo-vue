<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
    
    <v-toolbar-title>Sistema de Gerenciamento</v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar size="32">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser.name || 'Usuário' }}</v-list-item-title>
            <v-list-item-subtitle>Administrador</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>
        
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppHeader',

  computed: {
    ...mapState('user', ['currentUser']),
  },

  methods: {
    ...mapMutations('layout', ['TOGGLE_SIDEBAR']),
    
    toggleSidebar() {
      this.TOGGLE_SIDEBAR();
    },
  },
};
</script>