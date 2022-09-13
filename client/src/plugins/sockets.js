import { io } from "socket.io-client";

const URL_SOCKET = "http://localhost:3000";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(token) {
    this.socket = io(URL_SOCKET, {
      auth: {
        token: token,
      },
    });
  }

  // emitSocketEvent(name, data) {
  //   this.socket.emit(name, data);
  // }

  sendMessage(data) {
    this.socket.emit("message", data);
    console.log("I'm here");
  }
}

export default new SocketioService();
