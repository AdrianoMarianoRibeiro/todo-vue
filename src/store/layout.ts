import { Module } from "vuex";

export interface LayoutState {
  sidebar: boolean;
}

export const layout: Module<LayoutState, any> = {
  namespaced: true,
  state: {
    sidebar: true,
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebar = !state.sidebar;
    },
    SET_SIDEBAR(state, value: boolean) {
      state.sidebar = value;
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
};
