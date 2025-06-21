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
              <v-icon left>mdi-account-plus</v-icon>
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
              'items-per-page-options': [1, 5, 10, 25, 50]
            }"
            class="elevation-1"
          >
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

        <PostFormModal
          :value="formDialog"
          :post="selectedPost"
          @close="closeFormDialog"
          @refresh="onPostSaved" 
        />
        <ConfirmDeleteModal
          :value="deleteDialog"
          :item="selectedPost"
          @close="deleteDialog = false"
          @confirm="deletePost"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService';
import PostService from '@/services/PostService';
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

  props: {},

  data() {
    return {
      posts: [],
      totalItems: 0,
      loading: false,
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
        { text: 'Nome', value: 'post' },
        { text: 'User', value: 'user.name' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },

  created() {
    this.fetchPosts();
  },

  mounted() {},

  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await PostService.findAll(this.options.page, this.options.itemsPerPage);
        this.posts = response.items;
        this.totalItems = response.meta.itemCount;
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        this.posts = [];
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
      this.fetchPosts();
    },

    confirmDelete(post) {
      this.selectedPost = { ...post };
      this.deleteDialog = true;
    },

    async deletePost() {
      try {
        await PostService.delete(this.selectedPost.id);
        this.fetchPost();
      } catch (e) {
        console.error('Erro ao deletar post:', e);
      } finally {
        this.deleteDialog = false;
        this.selectedPost = null;
      }
    },
  },

  computed: {},

  watch: {
    options: {
      handler() {
        this.fetchPosts();
      },
      deep: true,
    },
  },
};
</script>