const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({
      success: true,
      settings,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateSettings = async (req, res) => {
  try {

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    settings.alertEmail = req.body.alertEmail;
    settings.emailAlertsEnabled = req.body.emailAlertsEnabled;
    settings.highAlerts = req.body.highAlerts;
    settings.criticalAlerts = req.body.criticalAlerts;
    settings.defaultLogSource = req.body.defaultLogSource;
    settings.defaultLogPath = req.body.defaultLogPath;

    await settings.save();

    res.json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  getSettings,
  updateSettings,
};