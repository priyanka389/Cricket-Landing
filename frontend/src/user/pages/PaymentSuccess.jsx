import React, {
  useEffect
} from "react";

import axios from "axios";
import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

const PaymentSuccess = () => {
  const navigate =
    useNavigate();

  const [params] =
    useSearchParams();

  useEffect(() => {
    activatePlan();
  }, []);

  const activatePlan =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const plan =
          params.get(
            "plan"
          );

        await axios.put(
          "http://localhost:4000/api/user/subscribe",
          {
            plan
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setTimeout(() => {
          navigate(
            "/user/profile"
          );
        }, 2500);

      } catch (error) {
        console.log(
          error
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">

      <div className="bg-[#1e293b] p-10 rounded-2xl text-center w-[420px]">

        <h1 className="text-4xl font-bold text-green-400 mb-4">
          ✅ Payment Success
        </h1>

        <p className="text-lg">
          Activating your subscription...
        </p>

        <p className="mt-4 text-sm text-gray-400">
          Redirecting to Profile...
        </p>

      </div>

    </div>
  );
};

export default PaymentSuccess;