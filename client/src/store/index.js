import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthenticationServices from "@/services/AuthenticationServices";

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
    async createBotChat() {
      const name = "Bot Chat";
      const email = "botchat@gmail.com";
      const password = "123456";
      const avatar =
        "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/300906804_1428278951005371_1686535244515835426_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OM9kOHPm1JYAX-qoGcz&_nc_ht=scontent.fhan2-5.fna&oh=00_AT9DjLnDnCNgTLk0JwqFIawd0UkyPrepiP40Y5H8Met3AQ&oe=63250392";
      const response = await AuthenticationServices.register({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });

      // console.log("response: ", response);
    },
  },
  modules: {},
});
