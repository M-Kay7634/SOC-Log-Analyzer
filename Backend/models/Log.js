const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Unknown",
    },

    region: {
      type: String,
      default: "Unknown",
    },

    city: {
      type: String,
      default: "Unknown",
    },

    timezone: {
      type: String,
      default: "Unknown",
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
    uploadBatchId: {
      type: String,
      required: true,
    },

    sourceFile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

logSchema.index({ threat: 1 });

logSchema.index({ priority: 1 });

logSchema.index({ uploadedBy: 1 });

logSchema.index({ createdAt: -1 });

logSchema.index({ country: 1 });

logSchema.index({ ip: 1 });

module.exports = mongoose.model("Log", logSchema);