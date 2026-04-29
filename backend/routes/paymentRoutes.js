const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe =
Stripe(
process.env.STRIPE_SECRET_KEY
);

router.post(
"/create-checkout-session",
async (req, res) => {
try {

const {
plan,
price
} = req.body;

const session =
await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",

line_items: [
{
price_data: {
currency: "inr",
product_data: {
name: plan
},
unit_amount:
price * 100
},
quantity: 1
}
],

success_url:
`${process.env.CLIENT_URL}/payment-success?plan=${plan}`,

cancel_url:
`${process.env.CLIENT_URL}/payment-cancel`
});

res.json({
url:
session.url
});

} catch (error) {
res.status(500).json({
msg:
"Stripe Error"
});
}
});

module.exports = router;