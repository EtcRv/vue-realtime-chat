import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    user: null,
    token: null,
    isUserLoggedIn: false,
    roomChatUrl: "/login",
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      if (token) state.isUserLoggedIn = true;
      else state.isUserLoggedIn = false;
    },
    setRoomChatUrl(state, url) {
      state.roomChatUrl = url;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setRoomChatUrl({ commit }, url) {
      commit("setRoomChatUrl", url);
    },
  },
  modules: {},
});
