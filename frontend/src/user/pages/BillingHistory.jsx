import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import UserLayout from "../layout/UserLayout";

const BillingHistory = () => {

  const [data, setData] =
    useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:4000/api/user/billing",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setData(
          res.data
        );

      } catch (error) {
        console.log(
          error
        );
      }
    };

  const downloadInvoice =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `http://localhost:4000/api/user/invoice/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              },
              responseType:
                "blob"
            }
          );

        const url =
          window.URL.createObjectURL(
            new Blob([
              res.data
            ])
          );

        const link =
          document.createElement(
            "a"
          );

        link.href =
          url;

        link.setAttribute(
          "download",
          "invoice.pdf"
        );

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

      } catch (error) {
        console.log(
          error
        );
      }
    };

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        💳 Billing History
      </h1>

      <div className="space-y-4">

        {data.length ===
          0 && (
          <div className="bg-[#1e293b] p-5 rounded-xl text-center text-gray-400">
            No Billing History Found
          </div>
        )}

        {data.map(
          (
            item,
            i
          ) => (
            <div
              key={i}
              className="bg-[#1e293b] p-5 rounded-xl"
            >

              <p>
                Plan:
                {" "}
                {
                  item.plan
                }
              </p>

              <p>
                Amount:
                ₹
                {
                  item.amount
                }
              </p>

              <p>
                Date:
                {" "}
                {new Date(
                  item.date
                ).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  downloadInvoice(
                    item._id
                  )
                }
                className="inline-block mt-3 bg-green-500 px-4 py-2 rounded-lg font-semibold hover:scale-105 duration-300"
              >
                📄 Download Invoice
              </button>

            </div>
          )
        )}

      </div>

    </UserLayout>
  );
};

export default BillingHistory;