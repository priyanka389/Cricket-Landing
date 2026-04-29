const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Payment =
require("../models/Payment");

const auth =
require("../middleware/authMiddleware");

// ALL USERS
router.get("/all", async (req, res) => {
  try {
    const users =
      await User.find({
        role: "user"
      });

    res.json({ users });

  } catch (err) {
    res.status(500).json({
      msg: "Error fetching users"
    });
  }
});

// PROFILE
router.get(
  "/profile",
  auth,
  async (req, res) => {
    try {
      let user =
        await User.findById(
          req.user.id
        );

      // 🔥 Auto downgrade
      if (
        user.plan !== "Free" &&
        user.planExpiry &&
        new Date() >
          new Date(
            user.planExpiry
          )
      ) {
        user.plan =
          "Free";

        user.planExpiry =
          null;

        await user.save();
      }

      user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.json(user);

    } catch (err) {
      res.status(500).json({
        msg: "Error profile"
      });
    }
  }
);

// UPDATE PROFILE
router.put(
  "/update",
  auth,
  async (req, res) => {
    try {
      const {
        name,
        team,
        avatar
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            name,
            team,
            avatar
          },
          {
            new: true
          }
        ).select("-password");

      res.json(user);

    } catch (err) {
      res.status(500).json({
        msg: "Error updating"
      });
    }
  }
);

// CHANGE PASSWORD
router.put(
  "/change-password",
  auth,
  async (req, res) => {
    try {
      const {
        oldPassword,
        newPassword
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          msg: "Old password wrong"
        });
      }

      const salt =
        await bcrypt.genSalt(10);

      user.password =
        await bcrypt.hash(
          newPassword,
          salt
        );

      await user.save();

      res.json({
        msg:
          "Password changed successfully"
      });

    } catch (err) {
      res.status(500).json({
        msg:
          "Password error"
      });
    }
  }
);

// SUBSCRIBE
router.put(
  "/subscribe",
  auth,
  async (req, res) => {
    try {
      const { plan } = req.body;

      let user =
        await User.findById(
          req.user.id
        );

      let expiry = null;

      if (plan !== "Free") {

        // renew same plan
        if (
          user.plan === plan &&
          user.planExpiry &&
          new Date(
            user.planExpiry
          ) > new Date()
        ) {
          expiry =
            new Date(
              user.planExpiry
            );

          expiry.setDate(
            expiry.getDate() +
              30
          );

        } else {
          expiry =
            new Date();

          expiry.setDate(
            expiry.getDate() +
              30
          );
        }
      }

      user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            plan,
            planExpiry:
              expiry
          },
          { new: true }
        ).select("-password");

      await Payment.create({
        userId:
          req.user.id,
        plan,
        amount:
          plan ===
          "Premium"
            ? 199
            : plan ===
              "VIP"
            ? 499
            : 0
      });

      res.json({
        msg:
          "Plan Updated Successfully",
        user
      });

    } catch (error) {
      res.status(500).json({
        msg:
          "Subscription Failed"
      });
    }
  }
);
// BILLING HISTORY
router.get(
  "/billing",
  auth,
  async (req, res) => {
    try {
      const payments =
        await Payment.find({
          userId:
            req.user.id
        }).sort({
          date: -1
        });

      res.json(
        payments
      );

    } catch (error) {
      res.status(500).json({
        msg:
          "Billing error"
      });
    }
  }
);


const PDFDocument =
require("pdfkit");

router.get(
"/invoice/:id",
auth,
async (req,res)=>{
try{

const payment =
await Payment.findById(
req.params.id
);

if(!payment){
return res.status(404).send("Not found");
}

const doc =
new PDFDocument();

res.setHeader(
"Content-Type",
"application/pdf"
);

res.setHeader(
"Content-Disposition",
`attachment; filename=invoice.pdf`
);

doc.pipe(res);

doc.fontSize(24)
.text(
"Cricket Premium Invoice",
{
align:"center"
}
);

doc.moveDown();

doc.fontSize(16)
.text(
`User ID: ${payment.userId}`
);

doc.text(
`Plan: ${payment.plan}`
);

doc.text(
`Amount: ₹${payment.amount}`
);

doc.text(
`Date: ${new Date(payment.date).toLocaleDateString()}`
);

doc.moveDown();

doc.text(
"Thank you for subscribing!"
);

doc.end();

}catch(error){
res.status(500).json({
msg:"Invoice Error"
});
}
});

module.exports = router;