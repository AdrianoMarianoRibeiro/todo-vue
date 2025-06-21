<template>
  <v-app-bar app color="primary" dark>
    <v-btn icon @click="toggleSidebar">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-toolbar-title>Meu Sistema</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'

@Component({
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('layout', ['toggleSidebar'])
  }
})
export default class AppHeader extends Vue {}
</script>
