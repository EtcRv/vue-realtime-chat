import Api from "./Api";

export default {
  register(user) {
    return Api().post("register", user);
  },
  login(user) {
    return Api().post("login", user);
  },
  getAllUsers() {
    return Api().get("allUsers");
  },
  getUser(userId) {
    return Api().get(`/chat/${userId}`);
  },
  searchUser(search) {
    return Api().get(`/user`, {
      params: {
        search: search,
      },
    });
  },
};
