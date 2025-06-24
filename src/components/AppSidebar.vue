<template>
  <v-navigation-drawer
    :value="sidebar"
    @input="setSidebar"
    app
    clipped
    color="grey lighten-4"
  >
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon color="primary" size="40">mdi-post</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">Sistema</v-list-item-title>
          <v-list-item-subtitle>Gerenciamento</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item router to="/" exact>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item router to="/user">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item router to="/post">
        <v-list-item-icon>
          <v-icon>mdi-post</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Posts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppSidebar',

  computed: {
    ...mapState('layout', ['sidebar']),
  },

  methods: {
    ...mapMutations('layout', ['SET_SIDEBAR']),
    
    setSidebar(value) {
      this.SET_SIDEBAR(value);
    },
  },
};
</script>