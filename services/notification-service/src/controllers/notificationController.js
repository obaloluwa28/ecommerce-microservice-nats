const Notification = require("../models/notificationModel");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).send({ data: notifications });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error retrieving notifications",
        error: error.message,
      });
  }
};

module.exports = { getNotifications };
