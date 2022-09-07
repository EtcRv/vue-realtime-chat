const { Message } = require("../models");

module.exports = {
  async getMessage(req, res) {
    try {
      const send_id = req.params.send_id;
      const receive_id = req.params.receive_id;

      if (!send_id || !receive_id) {
        return res.status(500).send({
          error: " Error when get message",
        });
      }

      const allMessages = await Message.findAll({
        where: {
          send_id: send_id,
          receive_id: receive_id,
        },
      });

      res.send(allMessages);
    } catch (err) {
      console.log("error in get message: ", err);
      res.status(500).send({
        error: "Can not load data",
      });
    }
  },
  async sendMessage(req, res) {
    try {
      const messageSend = await Message.create(req.body);

      res.send(messageSend);
    } catch (err) {
      console.log("error in send message: ", err);
      res.status(500).send({
        error: "Cannot send message",
      });
    }
  },
};
