<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              
              <v-card-text>
                <!-- Mostrar erro se houver -->
                <v-alert 
                  v-if="error" 
                  type="error" 
                  dismissible 
                  @input="clearError"
                  class="mb-4"
                >
                  {{ error }}
                </v-alert>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    type="email"
                    prepend-icon="mdi-email"
                    required
                    outlined
                    :disabled="loading"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Senha"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                    outlined
                    :disabled="loading"
                    @keyup.enter="login"
                  ></v-text-field>

                  <v-row>
                    <v-col>
                      <v-btn
                        :disabled="!valid || loading"
                        color="primary"
                        class="mr-4"
                        block
                        large
                        @click="login"
                        :loading="loading"
                      >
                        Entrar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'Login',

  data() {
    return {
      valid: false,
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      error: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      passwordRules: [
        v => !!v || 'Senha é obrigatória',
        v => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres',
      ],
    };
  },

  created() {
    // Se já estiver autenticado, redireciona para o dashboard
    if (AuthService.isAuthenticated()) {
      this.$router.push('/');
    }
  },

  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      this.error = '';

      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password,
        });

        // Armazena o token
        AuthService.setToken(response.data.accessToken);

        // Opcional: armazenar dados do usuário
        if (response.data.user) {
          localStorage.setItem('user_data', JSON.stringify(response.data.user));
        }

        // Redireciona para a página inicial
        this.$router.push('/');

        // Opcional: mostrar mensagem de sucesso
        this.$nextTick(() => {
          // Se você tiver um sistema de notificações global
          // this.$toast.success('Login realizado com sucesso!');
        });

      } catch (error) {
        console.error('Erro no login:', error);
        
        if (error.response && error.response.data && error.response.data.data) {
          this.error = error.response.data.data;
        } else if (error.response && error.response.status === 401) {
          this.error = error.response.data.data;
        } else {
          this.error = 'Erro interno do servidor. Tente novamente.';
        }
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = '';
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>