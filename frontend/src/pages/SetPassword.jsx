import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("TOKEN:", token); // 🔥 debug

    try {
      const res = await fetch("http://localhost:4000/api/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      console.log("RESPONSE:", data); // 🔥 debug

      alert(data.msg);

      if (data.success) {
        navigate("/signin");
      }

    } catch (err) {
      console.log(err);
      alert("Error setting password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="mb-4 font-bold text-lg">Set Your Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Set Password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;