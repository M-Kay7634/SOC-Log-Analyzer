const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { 
    registerUser,
    loginUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
    changePassword,
 } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.put("/change-password",protect,changePassword);

module.exports = router;