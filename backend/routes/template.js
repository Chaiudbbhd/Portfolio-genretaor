const express = require("express");
const router = express.Router();
const { useTemplate } = require("../controllers/templateController");
const auth = require("../middleware/auth"); // JWT auth middleware

router.post("/use", auth, useTemplate);

module.exports = router;
