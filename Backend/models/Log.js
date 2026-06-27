const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },

    timestamp: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    protocol: {
      type: String,
      required: true,
    },

    status: {
      type: Number,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    threat: {
      type: Boolean,
      default: false,
    },

    threatType: {
      type: String,
      default: null,
    },

    severity: {
      type: String,
      default: null,
    },

    priority: {
      type: String,
      default: "None",
    },

    threatScore: {
      type: Number,
      default: 0,
    },

    mitreTechnique: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logSchema);