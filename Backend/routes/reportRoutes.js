const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  exportCSV, exportExcel, exportPDF
} = require("../controllers/reportController");

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