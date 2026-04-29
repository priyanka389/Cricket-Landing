import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import { Bell } from "lucide-react";

const TopNavbar = () => {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://cricket-landing.onrender.com/api/user/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-[#1e293b] p-4 flex justify-between items-center">

      <h2 className="text-xl font-semibold">
        Welcome Back 👋
      </h2>

      <div className="flex items-center gap-4">

        <Bell />

        <img
          src={
            user?.avatar ||
            "https://i.pravatar.cc/40"
          }
          className="w-10 h-10 rounded-full object-cover"
        />

      </div>

    </div>
  );
};

export default TopNavbar;