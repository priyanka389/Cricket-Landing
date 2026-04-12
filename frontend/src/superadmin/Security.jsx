import React, { useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import {
  ShieldCheck,
  Lock,
  Key,
  AlertTriangle,
  LogOut
} from "lucide-react";

const Security = () => {

  const [twoFA, setTwoFA] = useState(false);

  return (
    <SuperAdminLayout>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="text-red-600" />
        <h1 className="text-3xl font-extrabold text-gray-800">
          Security Settings
        </h1>
      </div>

      {/* 🔐 Password Policy */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="text-blue-600" />
          <h2 className="text-lg font-semibold">Password Policy</h2>
        </div>

        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Minimum 8 characters</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 number</li>
          <li>Special character recommended</li>
        </ul>
      </div>

      {/* 🔑 Two Factor Authentication */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Key className="text-green-600" />
          <div>
            <h2 className="font-semibold">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-500">
              Add extra security to your account
            </p>
          </div>
        </div>

        <button
          onClick={() => setTwoFA(!twoFA)}
          className={`px-4 py-2 rounded-lg text-white transition
            ${twoFA ? "bg-green-600" : "bg-gray-400"}`}
        >
          {twoFA ? "Enabled" : "Enable"}
        </button>
      </div>

      {/* ⚠️ Security Alerts */}
      <div className="bg-yellow-50 p-6 rounded-2xl shadow mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="text-yellow-600" />
          <h2 className="font-semibold text-yellow-700">Security Alerts</h2>
        </div>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>⚡ Multiple login attempts detected</li>
          <li>🌍 New device login from unknown location</li>
          <li>🔒 Password not updated for 90 days</li>
        </ul>
      </div>

      {/* 🚪 Logout All Sessions */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LogOut className="text-red-500" />
          <div>
            <h2 className="font-semibold">Logout from all devices</h2>
            <p className="text-sm text-gray-500">
              Secure your account by logging out everywhere
            </p>
          </div>
        </div>

        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout All
        </button>
      </div>

    </SuperAdminLayout>
  );
};

export default Security;