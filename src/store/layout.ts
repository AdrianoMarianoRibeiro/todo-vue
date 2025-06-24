import { Module } from "vuex";
import { RootState } from "./types";

export interface LayoutState {
  sidebar: boolean;
}

export const layout: Module<LayoutState, RootState> = {
  namespaced: true,

  state: {
    sidebar: true,
  },

  mutations: {
    SET_SIDEBAR(state, value: boolean) {
      state.sidebar = value;
    },

    TOGGLE_SIDEBAR(state) {
      state.sidebar = !state.sidebar;
    },
  },

  actions: {
    toggleSidebar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },

    setSidebar({ commit }, value: boolean) {
      commit("SET_SIDEBAR", value);
    },
  },

  getters: {
    sidebarOpen: (state) => state.sidebar,
  },
};
