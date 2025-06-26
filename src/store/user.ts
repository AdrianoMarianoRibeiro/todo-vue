import { Module } from "vuex";
import { RootState } from "./types";
import UserService from "@/services/UserService";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  currentUser: { name: string };
  users: UserModel[];
  totalItems: number;
  loading: boolean;
  error: string | null;
}

export const user: Module<UserState, RootState> = {
  namespaced: true,

  state: {
    currentUser: { name: "Adriano Ribeiro" },
    users: [],
    totalItems: 0,
    loading: false,
    error: null,
  },

  mutations: {
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },

    SET_ERROR(state, error: string | null) {
      state.error = error;
    },

    SET_USERS(state, users: UserModel[]) {
      state.users = users;
    },

    SET_TOTAL_ITEMS(state, total: number) {
      state.totalItems = total;
    },

    ADD_USER(state, user: UserModel) {
      state.users.unshift(user);
      state.totalItems += 1;
    },

    UPDATE_USER(state, updatedUser: UserModel) {
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },

    DELETE_USER(state, id: string) {
      state.users = state.users.filter((u) => u.id !== id);
      state.totalItems -= 1;
    },

    CLEAR_ERROR(state) {
      state.error = null;
    },
  },

  actions: {
    async findAll({ commit }, { page = 1, limit = 10 } = {}) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await UserService.findAll(page, limit);
        commit("SET_USERS", response.items);
        commit("SET_TOTAL_ITEMS", response.meta.itemCount);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        commit("SET_ERROR", "Erro ao carregar usuários");
        commit("SET_USERS", []);
        commit("SET_TOTAL_ITEMS", 0);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async create({ commit, dispatch }, data) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await UserService.create(data);
        // Recarregar a lista após criar
        await dispatch("findAll");
        return response;
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        commit("SET_ERROR", "Erro ao criar usuário");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async update({ commit, dispatch }, { id, data }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await UserService.update(id, data);
        // Recarregar a lista após atualizar
        await dispatch("findAll");
        return response;
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        commit("SET_ERROR", "Erro ao atualizar usuário");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async delete({ commit, dispatch }, id: string) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        await UserService.delete(id);
        // Recarregar a lista após deletar
        await dispatch("findAll");
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        commit("SET_ERROR", "Erro ao deletar usuário");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async getAllUsers({ commit }) {
      try {
        const response = await UserService.getAll();
        return response.data || [];
      } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
        commit("SET_ERROR", "Erro ao carregar usuários");
        return [];
      }
    },

    clearError({ commit }) {
      commit("CLEAR_ERROR");
    },
  },

  getters: {
    activeUsers: (state) => state.users.filter((user) => user.status),
    inactiveUsers: (state) => state.users.filter((user) => !user.status),
    totalActiveUsers: (state, getters) => getters.activeUsers.length,
    totalInactiveUsers: (state, getters) => getters.inactiveUsers.length,
    getUserById: (state) => (id: string) =>
      state.users.find((user) => user.id === id),
  },
};
