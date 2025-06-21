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
          @close="deleteDialog = false"
          @confirm="deleteUser"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService';
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

  props: {},

  data() {
    return {
      users: [],
      totalItems: 0,
      loading: false,
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

  created() {
    this.fetchUsers();
  },

  mounted() {},

  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await UserService.findAll(this.options.page, this.options.itemsPerPage);
        this.users = response.items;
        this.totalItems = response.meta.itemCount;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        this.users = [];
        this.totalItems = 0;
      } finally {
        this.loading = false;
      }
    },

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
      this.fetchUsers();
    },

    confirmDelete(user) {
      this.selectedUser = { ...user };
      this.deleteDialog = true;
    },

    async deleteUser() {
      try {
        await UserService.delete(this.selectedUser.id);
        this.fetchUsers();
      } catch (e) {
        console.error('Erro ao deletar usuário:', e);
      } finally {
        this.deleteDialog = false;
        this.selectedUser = null;
      }
    },
  },

  computed: {},

  watch: {
    options: {
      handler() {
        this.fetchUsers();
      },
      deep: true,
    },
  },
};
</script>