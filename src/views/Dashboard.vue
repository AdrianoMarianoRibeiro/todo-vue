<!-- src/views/Dashboard.vue -->
<template>
  <v-app>
    <AppSidebar />
    <AppHeader />
    <v-main>
      <v-container fluid>
        <h1>Bem-vindo ao Dashboard</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

@Component({
  components: {
    AppSidebar,
    AppHeader
  }
})
export default class Dashboard extends Vue {}
</script>
