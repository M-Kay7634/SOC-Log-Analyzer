const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { sendEmail } = require("../services/email/emailService");
const otpTemplate = require("../services/email/otpTemplate");

const { hashPassword } = require("../utils/password");
const generateToken = require("../utils/jwt");

const {PASSWORD_MIN_LENGTH,OTP_EXPIRY_MINUTES,} = require("../utils/constants");

// Register User
const registerUser = async (req, res) => {

    // console.log("===========");
    // console.log("BODY:", req.body);
    // console.log("===========");
    
  try {
    //  console.log("BODY:", req.body);
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const createdAt = new Date().toISOString();
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Analyst",
      createdAt: createdAt,
    });

    // Generate JWT
    const token = generateToken(user);
    // console.log("token generated");
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // console.error("ERROR MESSAGE:", error.message);
    // console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};

// Login User
const loginUser = async (req, res) => {
  try {
    // console.log("Login API Hit");
    const { email, password } = req.body;
    // email = email.trim().toLowerCase();

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = generateToken(user);

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, an OTP has been sent.",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Store OTP and expiry
    user.resetOTP = otp;
    user.otpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await user.save();

    // Send Email
    await sendEmail({
      to: user.email,
      subject: "SOC Log Analyzer - Password Reset OTP",
      html: otpTemplate(otp),
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = req.body.otp?.trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = req.body.otp?.trim();
    const newPassword = req.body.newPassword;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Hash new password
    user.password = await hashPassword(newPassword);

    // Clear OTP
    user.resetOTP = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await hashPassword(newPassword);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  changePassword,
};