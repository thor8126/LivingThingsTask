const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const chartController = require("../controllers/chartController");
const accessLogController = require("../controllers/accessLogController");
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/chart-data", authenticateToken, chartController.getChartData);
router.get(
  "/access-logs",
  authenticateToken,
  accessLogController.getAccessLogs
);
router.post(
  "/access-logs",
  authenticateToken,
  accessLogController.createAccessLog
);

module.exports = router;
