const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

console.log("ENV:", process.env.DATABASE_URL);

// DB connect
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const createSuperAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const password = "admin123";

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("Super Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("Super Admin Created ✔");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
};

createSuperAdmin();