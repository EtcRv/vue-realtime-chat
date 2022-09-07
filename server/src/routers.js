const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicies = require("./policies/AuthenticationControllerPolices");
const MessageController = require("./controllers/MessageController");
module.exports = (app) => {
  app.post(
    "/register",
    AuthenticationControllerPolicies.register,
    AuthenticationController.register
  );
  app.post("/login", AuthenticationController.login);
  app.get("/chat/:userId", AuthenticationController.getUser);
  app.get("/user", AuthenticationController.searchUser);
  app.get("/allUsers", AuthenticationController.getAllUsers);
  app.get("/chat/:send_id/:receive_id", MessageController.getMessage);
  app.post("/chat", MessageController.sendMessage);
};
