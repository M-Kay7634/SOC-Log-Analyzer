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
const getThreatDistribution = async (req, res) => {
  try {
    const distribution = await Log.aggregate([
      {
        $match: {
          threat: true,
        },
      },
      {
        $group: {
          _id: "$threatType",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          threatType: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      distribution,
      generatedAt: new Date(),
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
  getThreatDistribution,
};