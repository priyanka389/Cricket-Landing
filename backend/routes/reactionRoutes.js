const express =
require("express");

const router =
express.Router();

const {
getReaction,
addReaction
} = require(
"../controllers/reactionController"
);

router.get(
"/:id",
getReaction
);

router.post(
"/add",
addReaction
);

module.exports =
router;