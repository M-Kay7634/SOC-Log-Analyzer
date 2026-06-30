const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { testEmail } = require("../controllers/emailController");

router.post("/test", protect, testEmail);

module.exports = router;