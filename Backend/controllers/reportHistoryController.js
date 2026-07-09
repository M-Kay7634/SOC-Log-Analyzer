const Report = require("../models/Report");

const getReportHistory = async (req, res) => {
  try {
    let reports;

    if (req.user.role === "Admin") {
      reports = await Report.find()
        .populate("generatedBy", "name email")
        .sort({ createdAt: -1 });
    } else {
      reports = await Report.find({
        generatedBy: req.user.id,
      })
        .populate("generatedBy", "name email")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      total: reports.length,
      reports,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReportHistory = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    if (
      req.user.role !== "Admin" &&
      report.generatedBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Report.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getReportHistory,
  deleteReportHistory,
};