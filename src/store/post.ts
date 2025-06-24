import { Module } from "vuex";
import { RootState } from "./types";

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
};
