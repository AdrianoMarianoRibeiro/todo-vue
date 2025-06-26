<template>
  <v-app>
    <AppSidebar />
    <AppHeader />
    <v-main>
      <v-container style="padding: 25px" fluid>
        <v-card class="custom-tabs" style="padding: 25px; margin-top: 2rem">
          <v-card-title>
            Gerenciamento de Usuários
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openCreateDialog">
              <v-icon left>mdi-account-plus</v-icon>
              Novo Usuário
            </v-btn>
          </v-card-title>

          <!-- Mostrar erro se houver -->
          <v-alert v-if="error" type="error" dismissible @input="clearError">
            {{ error }}
          </v-alert>

          <!-- Debug info -->
          <v-alert v-if="!loading && users.length === 0" type="info" class="mb-4">
            Nenhum usuário encontrado. Total: {{ totalItems }}
          </v-alert>

          <v-data-table
            :headers="headers" 
            :items="users"
            :loading="loading"
            :server-items-length="totalItems"
            :options.sync="options"
            :footer-props="{
              'items-per-page-options': [1, 5, 10, 25, 50]
            }"
            class="elevation-1"
          >
            <template #item.status="{ item }">
              <v-chip :color="item.status ? 'success' : 'error'" small>
                {{ item.status ? 'Ativo' : 'Inativo' }}
              </v-chip>
            </template>

            <template #item.createdAt="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>

            <template #item.actions="{ item }">
              <v-btn icon @click="openEditDialog(item)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="confirmDelete(item)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <UserFormModal
          :value="formDialog"
          :user="selectedUser"
          @close="closeFormDialog"
          @refresh="onUserSaved" 
        />

        <ConfirmDeleteModal
          :value="deleteDialog"
          :item="selectedUser"
          type="user"
          @close="deleteDialog = false"
          @confirm="deleteHandler"
        />
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import UserFormModal from '@/components/users/UserFormModal.vue';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'UserManagement',

  components: {
    UserFormModal,
    ConfirmDeleteModal,
    AppSidebar,
    AppHeader,
  },

  data() {
    return {
      formDialog: false,
      deleteDialog: false,
      selectedUser: null,
      options: {
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false
      },
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'status' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },

  computed: {
    ...mapState('user', ['users', 'totalItems', 'loading', 'error']),
    ...mapGetters('user', ['activeUsers', 'totalActiveUsers']),
  },

  created() {
    console.log('UserManagement created, chamando findAll...');
    this.findAll({ 
      page: this.options.page, 
      limit: this.options.itemsPerPage 
    });
  },

  mounted() {
    console.log('UserManagement mounted');
    console.log('Users no mounted:', this.users);
    console.log('Loading no mounted:', this.loading);
  },

  methods: {
    ...mapActions('user', [
      'findAll', 
      'create', 
      'update', 
      'delete', // Removido o "as deleteAction"
      'clearError'
    ]),

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
    },

    openCreateDialog() {
      this.selectedUser = null;
      this.formDialog = true;
    },

    openEditDialog(user) {
      this.selectedUser = { ...user };
      this.formDialog = true;
    },

    closeFormDialog() {
      this.formDialog = false;
      this.selectedUser = null;
    },

    onUserSaved() {
      this.findAll({ 
        page: this.options.page, 
        limit: this.options.itemsPerPage 
      });
    },

    confirmDelete(user) {
      this.selectedUser = { ...user };
      this.deleteDialog = true;
    },

    async deleteHandler() { // Renomeado o método local
      try {
        await this.delete(this.selectedUser.id); // Usando a action mapeada
      } catch (e) {
        console.error('Erro ao deletar usuário:', e);
      } finally {
        this.deleteDialog = false;
        this.selectedUser = null;
      }
    },
  },

  watch: {
    options: {
      handler() {
        console.log('Options changed:', this.options);
        this.findAll({ 
          page: this.options.page, 
          limit: this.options.itemsPerPage 
        });
      },
      deep: true,
    },

    users: {
      handler(newUsers) {
        console.log('Users mudaram:', newUsers);
      },
      immediate: true,
    },
  },
};
</script>