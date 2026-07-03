const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {getAllUsers, updateUserRole, getMyActivity,} = require("../controllers/userController");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", protect, adminOnly, getAllUsers);
router.get("/me/activity", protect, getMyActivity);
router.patch("/:id/role", protect, adminOnly, updateUserRole);

module.exports = router;