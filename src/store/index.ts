import Vue from "vue";
import Vuex from "vuex";
import { layout } from "./layout";
import { user } from "./user";
import { post } from "./post";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    post,
    layout,
  },
});
