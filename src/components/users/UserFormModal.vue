<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        <v-icon color="white" class="mr-2">
          {{ isEdit ? 'mdi-account-edit' : 'mdi-account-plus' }}
        </v-icon>
        {{ isEdit ? 'Editar Usuário' : 'Novo Usuário' }}
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
                v-model="form.name"
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

            <v-col v-if="!isEdit" cols="12">
              <v-text-field
                v-model="form.password"
                label="Senha"
                type="password"
                :rules="[rules.required, rules.minLength]"
                prepend-icon="mdi-lock"
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12">
              <div class="d-flex align-center">
                <v-icon color="success" class="mr-3">mdi-check-circle</v-icon>
                <span class="subtitle-1 mr-4">Status do usuário:</span>
                <v-switch
                  v-model="form.status"
                  :label="form.status ? 'Ativo' : 'Inativo'"
                  :color="form.status ? 'success' : 'error'"
                  inset
                />
              </div>
              <v-divider class="mt-2" />
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
          {{ isEdit ? 'Salvar Alterações' : 'Criar Usuário' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  name: 'UserFormModal',

  components: {},

  props: {
    value: Boolean,
    user: {
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
        name: '',
        email: '',
        password: '',
        status: true,
      },
      rules: {
        required: (v) => !!v || 'Campo obrigatório',
        email: (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
        minLength: (v) => (v && v.length >= 6) || 'Senha deve ter pelo menos 6 caracteres',
      },
    };
  },

  computed: {
    isEdit() {
      return !!this.user;
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
      if (this.user) {
        this.form = {
          name: this.user.name || '',
          email: this.user.email || '',
          password: '',
          status: this.user.status !== undefined ? this.user.status : true,
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
          await UserService.update(this.user.id, {
            name: this.form.name,
            email: this.form.email,
            status: this.form.status,
          });
        } else {
          await UserService.create({
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
        console.error('Erro ao salvar usuário:', err);
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