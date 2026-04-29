import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://cricket-landing.onrender.com/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotifications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const markRead = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://cricket-landing.onrender.com/api/notifications/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchNotifications();
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://cricket-landing.onrender.com/api/notifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchNotifications();
  };

  const unreadCount =
    notifications.filter(
      (item) => !item.isRead
    ).length;

  return (
    <UserLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          🔔 Notifications
        </h1>

        <span className="bg-red-500 px-4 py-2 rounded-full">
          {unreadCount} Unread
        </span>

      </div>

      <div className="space-y-4">

        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`p-4 rounded-xl ${
                item.isRead
                  ? "bg-[#1e293b]"
                  : "bg-[#334155]"
              }`}
            >

              <p>{item.message}</p>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>

              <div className="flex gap-3 mt-4">

                {!item.isRead && (
                  <button
                    onClick={() =>
                      markRead(item._id)
                    }
                    className="bg-green-500 px-4 py-2 rounded-lg"
                  >
                    ✔ Read
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteItem(item._id)
                  }
                  className="bg-red-500 px-4 py-2 rounded-lg"
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </UserLayout>
  );
};

export default Notifications;