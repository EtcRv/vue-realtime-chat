module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    send_id: DataTypes.INTEGER,
    receive_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
  });

  return Message;
};
