<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        <v-icon color="white" class="mr-2">
          {{ isEdit ? 'mdi-pencil' : 'mdi-plus' }}
        </v-icon>
        {{ isEdit ? 'Editar Post' : 'Novo Post' }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-6">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.post"
                label="Título do post"
                :rules="[rules.required]"
                prepend-icon="mdi-post"
                outlined
                dense
                required
              />
            </v-col>
            
            <v-col cols="12">
              <v-select
                v-model="form.userId"
                :items="users"
                item-text="name"
                item-value="id"
                label="Selecione o usuário"
                :rules="[rules.required]"
                prepend-icon="mdi-account"
                outlined
                dense
                required
                :loading="loadingUsers"
                :disabled="isEdit"
              >
                <template #item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          text
          color="primary"
          outlined
          @click="close"
          class="mr-2"
        >
          <v-icon left>mdi-cancel</v-icon>
          Cancelar
        </v-btn>
        
        <v-btn
          color="primary"
          :disabled="!valid"
          :loading="loading"
          @click="save"
          elevated
        >
          <v-icon left>{{ isEdit ? 'mdi-content-save' : 'mdi-plus' }}</v-icon>
          {{ isEdit ? 'Salvar Alterações' : 'Criar Post' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PostFormModal',

  components: {},

  props: {
    value: Boolean,
    post: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      dialog: false,
      valid: false,
      loading: false,
      loadingUsers: false,
      users: [],
      form: {
        post: '',
        userId: '',
      },
      rules: {
        required: (v) => !!v || 'Campo obrigatório',
      },
    };
  },

  computed: {
    isEdit() {
      return !!this.post;
    },
  },

  watch: {
    value(val) {
      this.dialog = val;
      if (val) {
        this.initForm();
        this.loadUsers();
      }
    },
  },

  created() {},

  mounted() {},

  methods: {
    ...mapActions('post', ['create', 'update']),
    ...mapActions('user', ['getAllUsers']),

    async loadUsers() {
      this.loadingUsers = true;
      try {
        this.users = await this.getAllUsers();
      } catch (error) {
        console.error('Erro ao carregar usuários:', this.users);
        this.users = [];
      } finally {
        this.loadingUsers = false;
      }
    },

    initForm() {
      if (this.post) {
        this.form = {
          post: this.post.post || '',
          userId: this.post.userId || this.post.user?.id || '',
        };
      } else {
        this.form = {
          post: '',
          userId: '',
        };
      }
      
      // Resetar validação
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },

    close() {
      this.loading = false;
      this.$emit('close');
    },

    async save() {
      // Validar formulário antes de salvar
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      
      try {
        if (this.isEdit) {
          await this.update({
            id: this.post.id,
            data: {
              post: this.form.post,
              userId: this.form.userId,
            }
          });
        } else {
          await this.create({
            post: this.form.post,
            userId: this.form.userId,
          });
        }
        
        this.$emit('refresh');
        this.close();
        
      } catch (err) {
        console.error('Erro ao salvar post:', err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-card__title {
  font-weight: 500;
}

.v-card__text {
  padding-bottom: 0 !important;
}
</style>