const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    format: {
      type: String,
      enum: ["PDF", "CSV", "Excel"],
      required: true,
    },

    totalLogs: {
      type: Number,
      default: 0,
    },

    severity: {
      type: String,
      default: "All",
    },

    threatType: {
      type: String,
      default: "All",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Report",
  reportSchema
);