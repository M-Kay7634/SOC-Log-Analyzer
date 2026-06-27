const Log = require("../models/Log");

const getSummary = async (req, res) => {
  try {
    const totalLogs = await Log.countDocuments();

    const totalThreats = await Log.countDocuments({
      threat: true,
    });

    const criticalThreats = await Log.countDocuments({
      priority: "Critical",
    });

    const highThreats = await Log.countDocuments({
      priority: "High",
    });

    const mediumThreats = await Log.countDocuments({
      priority: "Medium",
    });

    const lowThreats = await Log.countDocuments({
      priority: "Low",
    });

    res.status(200).json({
      success: true,
      summary: {
        totalLogs,
        totalThreats,
        criticalThreats,
        highThreats,
        mediumThreats,
        lowThreats,
      },
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
  getSummary,
};