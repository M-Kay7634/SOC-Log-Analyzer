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
const getTopAttackingIPs = async (req, res) => {
  try {
    const topIPs = await Log.aggregate([
      {
        $match: {
          threat: true,
        },
      },
      {
        $group: {
          _id: "$ip",
          attacks: { $sum: 1 },
          highestSeverity: { $max: "$severity" },
        },
      },
      {
        $project: {
          _id: 0,
          ip: "$_id",
          attacks: 1,
          highestSeverity: 1,
        },
      },
      {
        $sort: {
          attacks: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json({
      success: true,
      topIPs,
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
const getThreatTimeline = async (req, res) => {
  try {
    const timeline = await Log.aggregate([
      {
        $match: {
          threat: true,
        },
      },
      {
        $group: {
          _id: "$timestamp",
          threats: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          timestamp: "$_id",
          threats: 1,
        },
      },
      {
        $sort: {
          timestamp: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      timeline,
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

const getRecentThreats = async (req, res) => {
  try {
    const recentThreats = await Log.find({
      threat: true,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "ip threatType severity timestamp mitreTechnique priority"
      );

    res.status(200).json({
      success: true,
      recentThreats,
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
  getTopAttackingIPs,
  getThreatTimeline,
  getRecentThreats,
};