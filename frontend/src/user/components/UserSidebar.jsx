import React from "react";
import {
  Calendar,
  Crown,
  Ticket,
  Trophy,
  Receipt
} from "lucide-react";

import { Settings as SettingsIcon } from "lucide-react";

import {
  Home,
  Radio,
  Heart,
  Bell,
  User,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const navigate =
    useNavigate();

  const menu = [
    {
      name: "Home",
      icon: <Home />,
      path:
        "/user/dashboard"
    },

    {
      name:
        "Live Matches",
      icon: <Radio />,
      path:
        "/user/live"
    },

    {
      name:
        "Watchlist",
      icon: <Heart />,
      path:
        "/user/watchlist"
    },

    {
      name:
        "Notifications",
      icon: <Bell />,
      path:
        "/user/notifications"
    },

    {
      name:
        "Profile",
      icon: <User />,
      path:
        "/user/profile"
    },

    {
      name:
        "Schedule",
      icon:
        <Calendar />,
      path:
        "/user/schedule"
    },

    {
      name:
        "Subscription",
      icon:
        <Crown />,
      path:
        "/user/subscription"
    },

    {
      name:
        "Billing History",
      icon:
        <Receipt />,
      path:
        "/user/billing"
    },

    {
      name:
        "Tickets",
      icon:
        <Ticket />,
      path:
        "/user/tickets"
    },

    {
      name:
        "Fantasy Zone",
      icon:
        <Trophy />,
      path:
        "/user/fantasy"
    },

    {
      name:
        "Settings",
      icon:
        <SettingsIcon />,
      path:
        "/user/settings"
    }
  ];

  return (
    <div className="w-64 bg-[#020617] p-5">

      <h1 className="text-2xl font-bold text-green-400 mb-8">
        Cricket🔥
      </h1>

      {menu.map(
        (
          item,
          i
        ) => (
          <div
            key={i}
            onClick={() =>
              navigate(
                item.path
              )
            }
            className="flex gap-3 p-3 rounded-lg mb-2 hover:bg-[#1e293b] cursor-pointer"
          >
            {item.icon}
            {item.name}
          </div>
        )
      )}

      <div className="absolute bottom-5 flex gap-3 p-3 cursor-pointer">
        <LogOut />
        Logout
      </div>

    </div>
  );
};

export default UserSidebar;