const Notification = require("../models/Notification");

const addNotification = async (req, res) => {
  try {
    const { matchId, message } = req.body;

    const exists = await Notification.findOne({
      userId: req.user.id,
      matchId
    });

    if (exists) {
      return res.json({
        message: "Already reminded 🔔"
      });
    }

    await Notification.create({
      userId: req.user.id,
      matchId,
      message
    });

    res.json({
      message: "Reminder Added 🔔"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const data = await Notification.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true }
  );

  res.json({
    message: "Marked as read"
  });
};

const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });
};

module.exports = {
  addNotification,
  getNotifications,
  markAsRead,
  deleteNotification
};