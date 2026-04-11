const nodemailer = require("nodemailer")
require("dotenv").config();
const mailSender = async (email, title, body) => {
  try {
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS:", process.env.MAIL_PASS);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    let info = await transporter.sendMail({
      from: `"CricStream" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body
    })
    console.log("Email sent:", info.response);

    return info
  } catch (error) {
    console.log(error)
  }
}

module.exports = mailSender