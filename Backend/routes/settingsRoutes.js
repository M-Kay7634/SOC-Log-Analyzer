const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getSettings,
    updateSettings,
} = require("../controllers/settingsController");

const {
    testEmail,
} = require("../controllers/emailController");

router.get("/", protect, getSettings);

router.put(
  "/",
  protect,
  authorizeRoles("Admin"),
  updateSettings
);

router.post(
  "/test-email",
  protect,
  authorizeRoles("Admin"),
  testEmail
);

module.exports = router;