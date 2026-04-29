import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import UserLayout from "../layout/UserLayout";

const Subscription = () => {
  const [user, setUser] =
    useState(null);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      badge: "",
      features: [
        "480p Streaming",
        "Ads Included",
        "1 Device Access"
      ],
      color:
        "from-gray-500 to-gray-700"
    },

    {
      name: "Premium",
      price: "₹199/mo",
      badge:
        "🔥 Most Popular",
      features: [
        "HD Streaming",
        "No Ads",
        "3 Device Access",
        "Priority Support"
      ],
      color:
        "from-green-500 to-emerald-700"
    },

    {
      name: "VIP",
      price: "₹499/mo",
      badge:
        "💎 Best Value",
      features: [
        "4K Streaming",
        "No Ads",
        "Unlimited Devices",
        "Exclusive Camera Angles",
        "VIP Support"
      ],
      color:
        "from-yellow-400 to-orange-500"
    }
  ];

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
            "http://localhost:4000/api/user/profile",
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
        console.log(
          error
        );
      }
    };

  const subscribePlan =
    async (
      planName,
      price
    ) => {
      try {
        const res =
          await axios.post(
            "http://localhost:4000/api/payment/create-checkout-session",
            {
              plan:
                planName,
              price
            }
          );

        window.location.href =
          res.data.url;

      } catch (error) {
        console.log(
          error
        );

        alert(
          "Payment Failed"
        );
      }
    };

  if (!user)
    return (
      <UserLayout>
        <p>Loading...</p>
      </UserLayout>
    );

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-3">
        💎 Subscription Plans
      </h1>

      <p className="mb-2 text-green-400">
        Current Plan: {user.plan}
      </p>

      {user.planExpiry && (
        <>
          <p className="text-yellow-400">
            Valid till:{" "}
            {new Date(
              user.planExpiry
            ).toLocaleDateString()}
          </p>

          <p className="mb-8 text-red-400">
            Expires in{" "}
            {Math.ceil(
              (new Date(
                user.planExpiry
              ) -
                new Date()) /
                (1000 *
                  60 *
                  60 *
                  24)
            )}{" "}
            days
          </p>
        </>
      )}

      {!user.planExpiry && (
        <div className="mb-8"></div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {plans.map(
          (
            plan,
            i
          ) => {
            const isCurrent =
              user.plan ===
              plan.name;

            return (
              <div
                key={
                  i
                }
                className={`bg-[#1e293b] p-6 rounded-2xl hover:scale-105 duration-300 ${
                  isCurrent
                    ? "border-2 border-green-500"
                    : ""
                }`}
              >

                {plan.badge && (
                  <div className="mb-4 inline-block bg-red-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {
                      plan.badge
                    }
                  </div>
                )}

                <h2 className="text-2xl font-bold">
                  {
                    plan.name
                  }

                  {isCurrent &&
                    " 🔥"}
                </h2>

                <p className="text-3xl font-bold text-green-400 mt-3">
                  {
                    plan.price
                  }
                </p>

                <div className="mt-5 space-y-3">

                  {plan.features.map(
                    (
                      feature,
                      index
                    ) => (
                      <p
                        key={
                          index
                        }
                      >
                        ✅{" "}
                        {
                          feature
                        }
                      </p>
                    )
                  )}

                </div>

                <button
                  disabled={
                    isCurrent &&
plan.name === "Free"
                  }
                  onClick={() =>
                    subscribePlan(
                      plan.name,
                      plan.name ===
                        "Premium"
                        ? 199
                        : plan.name ===
                          "VIP"
                        ? 499
                        : 0
                    )
                  }
                  className={`mt-6 w-full py-3 rounded-xl font-semibold ${
                    isCurrent
                      ? "bg-gray-600 cursor-not-allowed"
                      : `bg-gradient-to-r ${plan.color}`
                  }`}
                >
                  {isCurrent &&
user.plan !== "Free"
? `Renew ${plan.name}`

: isCurrent
? "Active Now"

: user.plan === "Free"
? `Upgrade to ${plan.name}`

: `Switch to ${plan.name}`}
                </button>

              </div>
            );
          }
        )}

      </div>

    </UserLayout>
  );
};

export default Subscription;