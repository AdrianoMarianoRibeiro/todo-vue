<template>
  <v-dialog v-model="dialog" max-width="450px" persistent>
    <v-card>
      <v-card-title class="error white--text">
        <v-icon color="white" class="mr-2">mdi-delete-alert</v-icon>
        Confirmar Exclusão
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-6 pb-4">
        <div class="text-center">
          <v-icon size="64" color="error" class="mb-4">mdi-delete-circle</v-icon>
          <h3 class="headline mb-4">Você tem certeza?</h3>
          <p class="body-1 grey--text text--darken-2">
            Esta ação excluirá permanentemente {{ itemType }} 
            <strong class="error--text">{{ itemName }}</strong>
          </p>
          <p class="body-2 grey--text">
            Esta ação não pode ser desfeita.
          </p>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-6 py-4">
        <v-btn
          text
          color="error"
          @click="close"
          outlined
        >
          <v-icon left>mdi-cancel</v-icon>
          Cancelar
        </v-btn>
        
        <v-spacer />
        
        <v-btn
          color="error"
          @click="confirm"
          elevated
          :loading="loading"
        >
          <v-icon left>mdi-delete</v-icon>
          Sim, Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDeleteModal',

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'item', // 'user', 'post', etc
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
    };
  },

  computed: {
    itemType() {
      const types = {
        user: 'o usuário',
        post: 'o post',
        item: 'o item'
      };
      return types[this.type] || 'o item';
    },

    itemName() {
      if (!this.item) return '';
      // Para usuários, usar 'name'. Para posts, usar 'post'
      return this.item.name || this.item.post || 'item sem nome';
    }
  },

  watch: {
    value(val) {
      this.dialog = val;
    },
  },

  created() {},

  mounted() {},

  methods: {
    close() {
      this.loading = false;
      this.$emit('close');
    },

    confirm() {
      this.loading = true;
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
.v-card__title {
  font-weight: 500;
}

.headline {
  font-weight: 400;
}

.v-icon.v-icon--size-default {
  font-size: 64px !important;
}
</style>