<template>
  <v-app>
    <AppSidebar />
    <AppHeader />
    <v-main>
      <v-container style="padding: 25px" fluid>
        <v-card class="custom-tabs" style="padding: 25px; margin-top: 2rem">
          <v-card-title>
            Gerenciamento de Posts
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openCreateDialog">
              <v-icon left>mdi-plus</v-icon>
              Novo Post
            </v-btn>
          </v-card-title>

          <v-data-table 
            :headers="headers"
            :items="posts"
            :loading="loading"
            :server-items-length="totalItems"
            :options.sync="options" 
            :footer-props="{
              'items-per-page-options': [1, 5, 10, 25, 50],
              'items-per-page-text': 'Itens por página',
              'page-text': '{0}-{1} de {2}'
            }"
            no-data-text="Nenhum post encontrado"
            no-results-text="Nenhum post encontrado"
            loading-text="Carregando..."
            class="elevation-1"
          >
            <template #[`item.createdAt`]="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>

            <template #[`item.actions`]="{ item }">
              <v-btn icon @click="openEditDialog(item)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="confirmDelete(item)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <PostFormModal
          :value="formDialog"
          :post="selectedPost"
          @close="closeFormDialog"
          @refresh="onPostSaved"
        />

        <ConfirmDeleteModal
          :value="deleteDialog"
          :item="selectedPost"
          type="post"
          @close="deleteDialog = false"
          @confirm="deletePost"
        />

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostFormModal from '@/components/posts/PostFormModal.vue';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'PostManagement',

  components: {
    PostFormModal,
    ConfirmDeleteModal,
    AppSidebar,
    AppHeader,
  },

  data() {
    return {
      formDialog: false,
      deleteDialog: false,
      selectedPost: null,
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
        { text: 'Post', value: 'post' },
        { text: 'Usuário', value: 'user.name' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },

  computed: {
    ...mapState('post', ['posts', 'totalItems', 'loading', 'error']),
  },

  created() {
    this.findAll({ 
      page: this.options.page, 
      limit: this.options.itemsPerPage 
    });
  },

  mounted() { },

  methods: {
    ...mapActions('post', [
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
      this.selectedPost = null;
      this.formDialog = true;
    },

    openEditDialog(post) {
      this.selectedPost = { ...post };
      this.formDialog = true;
    },

    closeFormDialog() {
      this.formDialog = false;
      this.selectedPost = null;
    },

    onPostSaved() {
      this.findAll({ 
        page: this.options.page, 
        limit: this.options.itemsPerPage 
      });
    },

    confirmDelete(post) {
      this.selectedPost = { ...post };
      this.deleteDialog = true;
    },

    async deletePost() {
      try {
        await this.delete(this.selectedPost.id); 
      } catch (e) {
        console.error('Erro ao deletar post:', e);
      } finally {
        this.deleteDialog = false;
        this.selectedPost = null;
      }
    },
  },

  watch: {
    options: {
      handler() {
        this.findAll({ 
          page: this.options.page, 
          limit: this.options.itemsPerPage 
        });
      },
      deep: true,
    },
  },
};
</script>