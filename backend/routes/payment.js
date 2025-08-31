const express = require("express");
const router = express.Router();
const { buyPlan } = require("../controllers/paymentController");
const auth = require("../middleware/auth"); // JWT auth middleware

router.post("/buy", auth, buyPlan);

module.exports = router;
