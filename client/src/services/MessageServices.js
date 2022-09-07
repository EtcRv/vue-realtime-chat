import Api from "./Api";

export default {
  getMessage(send_id, receive_id) {
    return Api().get(`chat/${send_id}/${receive_id}`);
  },
  sendMessage(data) {
    return Api().post("/chat", data);
  },
};
