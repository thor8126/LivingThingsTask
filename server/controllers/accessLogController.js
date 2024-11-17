const AccessLog = require("../models/AccessLog");

const createAccessLog = async (req, res) => {
  try {
    const { accessTime, accessDate, employeeName, algoStatus, chartFilters } =
      req.body;

    if (!accessTime || !accessDate || !employeeName || !algoStatus) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const formattedAlgoStatus = algoStatus === "1" ? "ON" : "OFF";

    const accessLog = new AccessLog({
      accessTime,
      accessDate,
      employeeName,
      algoStatus: formattedAlgoStatus,
      chartFilters,
    });

    await accessLog.save();

    res.status(201).json({
      success: true,
      data: accessLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating access log",
      error: error.message,
    });
  }
};

const getAccessLogs = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;
    let query = {};

    if (startDate && endDate) {
      if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Use 'YYYY-MM-DD'.",
        });
      }
      query.accessDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const logs = await AccessLog.find(query)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching access logs",
      error: error.message,
    });
  }
};

module.exports = { createAccessLog, getAccessLogs };
