const Log = require("../models/Log");
const User = require("../models/User");
const Report = require("../models/Report");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -resetOTP -otpExpires")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update User Role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role.",
      });
    }

    if (!["Admin", "Analyst"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getMyActivity = async (req, res) => {
  try {
    const uploadedLogs = await Log.countDocuments({
      uploadedBy: req.user.id,
    });

    const threats = await Log.countDocuments({
      uploadedBy: req.user.id,
      threat: true,
    });

    const reports = await Report.countDocuments({
      generatedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      activity: {
        uploadedLogs,
        threats,
        reports,
      },
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
  getAllUsers,
  updateUserRole,
  getMyActivity,
};