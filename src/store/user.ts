import { v4 as uuidv4 } from "uuid";
import { Module } from "vuex";
import { RootState } from "./types";

export interface UserModel {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  user: { name: string };
  users: UserModel[];
}

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    user: { name: "Adriano Ribeiro" },
    users: [
      { id: "1", name: "João", email: "joao@email.com" },
      { id: "2", name: "Maria", email: "maria@email.com" },
    ],
  },
  mutations: {
    ADD_USER(state, user: UserModel) {
      state.users.push({ ...user, id: uuidv4() });
    },
    UPDATE_USER(state, updatedUser: UserModel) {
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) state.users.splice(index, 1, updatedUser);
    },
    DELETE_USER(state, id: string) {
      state.users = state.users.filter((u) => u.id !== id);
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit("ADD_USER", user);
    },
    updateUser({ commit }, user) {
      commit("UPDATE_USER", user);
    },
    deleteUser({ commit }, id) {
      commit("DELETE_USER", id);
    },
  },
};
