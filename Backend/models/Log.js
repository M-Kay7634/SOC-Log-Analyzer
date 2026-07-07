const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      default:null,
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
    source: {
      type: String,
      enum: ["Apache", "Linux", "Windows"],
      required: true,
    },

    method: {
      type: String,
      default:null,
    },

    url: {
      type: String,
      default:null,
    },

    protocol: {
      type: String,
      default:null,
    },

    status: {
      type: Number,
      default:null,
    },

    size: {
      type: Number,
      default:null,
    },
    host: {
      type: String,
      default: null,
    },

    service: {
      type: String,
      default: null,
    },

    message: {
      type: String,
      default: null,
    },
    eventId: {
      type: Number,
      default: null,
    },

    level: {
      type: String,
      default: null,
    },

    account: {
      type: String,
      default: null,
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