import { Module } from "vuex";
import { RootState } from "./types";
import PostService from "@/services/PostService";

export interface PostModel {
  id: string;
  post: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PostState {
  posts: PostModel[];
  totalItems: number;
  loading: boolean;
  error: string | null;
}

export const post: Module<PostState, RootState> = {
  namespaced: true,

  state: {
    posts: [],
    totalItems: 0,
    loading: false,
    error: null,
  },

  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },

    SET_TOTAL_ITEMS(state, totalItems) {
      state.totalItems = totalItems;
    },

    SET_LOADING(state, loading) {
      state.loading = loading;
    },

    SET_ERROR(state, error) {
      state.error = error;
    },

    UPDATE_POST(state, updatedPost: PostModel) {
      const index = state.posts.findIndex((p) => p.id === updatedPost.id);
      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost);
      }
    },

    DELETE_POST(state, id: string) {
      state.posts = state.posts.filter((p) => p.id !== id);
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
        const response = await PostService.findAll(page, limit);
        commit("SET_POSTS", response.items);
        commit("SET_TOTAL_ITEMS", response.meta.itemCount);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        commit("SET_ERROR", "Erro ao carregar os posts");
        commit("SET_POSTS", []);
        commit("SET_TOTAL_ITEMS", 0);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async create({ commit, dispatch }, data) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await PostService.create(data);
        // Recarregar a lista após criar
        await dispatch("findAll");
        return response;
      } catch (error) {
        console.error("Erro ao criar o post:", error);
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
        const response = await PostService.update(id, data);
        // Recarregar a lista após atualizar
        await dispatch("findAll");
        return response;
      } catch (error) {
        console.error("Erro ao atualizar o post:", error);
        commit("SET_ERROR", "Erro ao atualizar o post");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async delete({ commit, dispatch }, id) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        await PostService.delete(id);
        commit("DELETE_POST", id);
        // Recarregar a lista após deletar
        await dispatch("findAll");
      } catch (error) {
        console.error("Erro ao deletar o post:", error);
        commit("SET_ERROR", "Erro ao deletar o post");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
