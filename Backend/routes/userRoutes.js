const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {getAllUsers, updateUserRole,} = require("../controllers/userController");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", protect, getAllUsers);
router.patch("/:id/role", protect, adminOnly, updateUserRole);

module.exports = router;