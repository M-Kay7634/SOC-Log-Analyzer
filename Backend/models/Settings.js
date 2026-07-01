const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    alertEmail: {
      type: String,
      default: "",
    },

    emailAlertsEnabled: {
      type: Boolean,
      default: true,
    },

    highAlerts: {
      type: Boolean,
      default: true,
    },

    criticalAlerts: {
      type: Boolean,
      default: true,
    },

    defaultLogSource: {
      type: String,
      default: "Apache",
    },

    defaultLogPath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Settings",
    settingsSchema
  );