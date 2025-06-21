<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        <v-icon color="white" class="mr-2">
          {{ isEdit ? 'mdi-account-edit' : 'mdi-account-plus' }}
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
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.post"
                label="Nome completo"
                :rules="[rules.required]"
                prepend-icon="mdi-account"
                outlined
                dense
                required
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.email"
                label="E-mail"
                :rules="[rules.required, rules.email]"
                prepend-icon="mdi-email"
                outlined
                dense
                required
              />
            </v-col>
            
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          text
          color="red darken-1"
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
import PostService from '@/services/PostService';

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
      form: {
        post: '',
        postId: '',
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
      if (val) this.initForm();
    },
  },

  created() {},

  mounted() {},

  methods: {
    initForm() {
      if (this.post) {
        this.form = {
          name: this.post.name || '',
          email: this.post.email || '',
          password: '',
          status: this.post.status !== undefined ? this.post.status : true,
        };
      } else {
        this.form = {
          name: '',
          email: '',
          password: '',
          status: true,
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
          await PostService.update(this.post.id, {
            name: this.form.name,
            email: this.form.email,
            status: this.form.status,
          });
        } else {
          await PostService.create({
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            status: this.form.status,
          });
        }
        
        this.$emit('refresh');
        this.close();
        
        // Mostrar mensagem de sucesso (opcional)
        this.$nextTick(() => {
          // Você pode adicionar um toast/snackbar aqui
        });
        
      } catch (err) {
        console.error('Erro ao salvar Post:', err);
        // Aqui você pode mostrar uma mensagem de erro
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

.v-switch {
  margin-top: 0;
}
</style>