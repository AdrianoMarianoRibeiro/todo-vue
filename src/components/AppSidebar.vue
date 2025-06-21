<template>
  <v-navigation-drawer
    app
    v-model="sidebar"
    :mini-variant.sync="mini"
    clipped
  >
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="!mini">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/user">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="!mini">
          <v-list-item-title>Usuário</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/post">
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="!mini">
          <v-list-item-title>Post</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('layout', ['sidebar'])
  }
})
export default class AppSidebar extends Vue {
  mini: boolean = false
  
  // Declarar a propriedade sidebar para o TypeScript
  sidebar!: boolean
}
</script>