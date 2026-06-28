const Log = require("../models/Log");

// Get All Threats
const getAllThreats = async (req, res) => {
  try {
    const threats = await Log.find({
      threat: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: threats.length,
      threats,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllThreats,
};