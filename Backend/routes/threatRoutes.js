const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getAllThreats,
} = require("../controllers/threatController");

router.get("/", protect, getAllThreats);

module.exports = router;