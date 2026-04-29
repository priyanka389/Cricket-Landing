const express =
require("express");

const router =
express.Router();

const {
sendMessage,
getMessages,
votePoll,
getPoll
} = require(
"../controllers/liveFeatureController"
);

router.post(
"/chat",
sendMessage
);

router.get(
"/chat/:id",
getMessages
);

router.post(
"/poll",
votePoll
);

router.get(
"/poll/:id",
getPoll
);

module.exports = router;