const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {exportCSV, exportExcel, exportPDF} = require("../controllers/reportController");
const {getReportHistory, deleteReportHistory,} = require("../controllers/reportHistoryController");

router.get(
  "/history",
  protect,
  getReportHistory
);

router.delete(
  "/history/:id",
  protect,
  deleteReportHistory
);
router.get(
  "/export/csv",
  protect,
  exportCSV
);

router.get(
  "/export/excel",
  protect,
  exportExcel
);

router.get(
  "/export/pdf",
  protect,
  exportPDF
);

module.exports = router;