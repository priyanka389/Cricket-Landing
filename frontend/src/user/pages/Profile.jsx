import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../layout/UserLayout";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [edit, setEdit] = useState(false);

  const [passwordModal, setPasswordModal] =
    useState(false);

  const [passwordForm, setPasswordForm] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

  const [form, setForm] = useState({
    name: "",
    team: "",
    avatar: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

      setForm({
        name: res.data.name,
        team: res.data.team,
        avatar: res.data.avatar
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.put(
            "http://localhost:4000/api/user/update",
            form,
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

        alert(
          "Profile Updated ✅"
        );

        setEdit(false);

      } catch (error) {
        console.log(error);

        alert(
          "Update Failed ❌"
        );
      }
    };

  const changePassword =
    async () => {
      if (
        passwordForm.newPassword !==
        passwordForm.confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.put(
            "http://localhost:4000/api/user/change-password",
            {
              oldPassword:
                passwordForm.oldPassword,
              newPassword:
                passwordForm.newPassword
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        alert(
          res.data.msg
        );

        setPasswordModal(
          false
        );

        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });

      } catch (error) {
        console.log(error);

        alert(
          "Password failed ❌"
        );
      }
    };

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        avatar: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  if (!user)
    return (
      <UserLayout>
        <p>Loading...</p>
      </UserLayout>
    );

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        👤 My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="bg-[#1e293b] p-6 rounded-2xl text-center">

          <img
            src={
              user.avatar ||
              "https://i.pravatar.cc/120"
            }
            alt="profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-green-500 object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user.name}
          </h2>

          <p className="text-gray-300 mt-1">
            {user.email}
          </p>

          <p className="mt-3">
            Favorite Team: {user.team}
          </p>

          <span className="inline-block mt-4 bg-yellow-500 px-4 py-1 rounded-full font-semibold">
  💎 {user.plan}
</span>

{user.planExpiry && (
  <>
    <p className="mt-2 text-sm text-yellow-400">
      Valid till{" "}
      {new Date(
        user.planExpiry
      ).toLocaleDateString()}
    </p>

    <p className="mt-1 text-sm text-red-400">
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
      days left
    </p>
  </>
)}

          <p className="mt-3 text-sm text-gray-400">
            Joined{" "}
            {new Date(
              user.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 bg-[#1e293b] p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-4">
            🎥 Watch History
          </h2>

          <div className="space-y-3">
            <div className="bg-[#334155] p-4 rounded-xl">
              Coming Soon 🔥
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <button
              onClick={() =>
                setEdit(true)
              }
              className="bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold"
            >
              ✏ Edit Profile
            </button>

            <button
              onClick={() =>
                setPasswordModal(
                  true
                )
              }
              className="bg-gradient-to-r from-blue-500 to-indigo-600 py-3 rounded-xl font-semibold"
            >
              🔒 Change Password
            </button>

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}
      {edit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#1e293b] p-6 rounded-2xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Profile
            </h2>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value
                })
              }
              placeholder="Name"
              className="w-full mb-3 p-2 rounded bg-[#0f172a]"
            />

            <input
              type="text"
              value={form.team}
              onChange={(e) =>
                setForm({
                  ...form,
                  team:
                    e.target.value
                })
              }
              placeholder="Favorite Team"
              className="w-full mb-3 p-2 rounded bg-[#0f172a]"
            />

            <input
              type="file"
              onChange={
                handleImage
              }
              className="mb-3"
            />

            <div className="flex gap-3">

              <button
                onClick={
                  handleUpdate
                }
                className="flex-1 bg-green-500 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEdit(
                    false
                  )
                }
                className="flex-1 bg-red-500 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* PASSWORD MODAL */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#1e293b] p-6 rounded-2xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Old Password"
              value={
                passwordForm.oldPassword
              }
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  oldPassword:
                    e.target.value
                })
              }
              className="w-full mb-3 p-2 rounded bg-[#0f172a]"
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwordForm.newPassword
              }
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword:
                    e.target.value
                })
              }
              className="w-full mb-3 p-2 rounded bg-[#0f172a]"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordForm.confirmPassword
              }
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword:
                    e.target.value
                })
              }
              className="w-full mb-3 p-2 rounded bg-[#0f172a]"
            />

            <div className="flex gap-3">

              <button
                onClick={
                  changePassword
                }
                className="flex-1 bg-green-500 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setPasswordModal(
                    false
                  )
                }
                className="flex-1 bg-red-500 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </UserLayout>
  );
};

export default Profile;