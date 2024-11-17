const ChartData = require("../models/ChartData");
const AccessLog = require("../models/AccessLog");

const getChartData = async (req, res) => {
  try {
    const { startDate, endDate, algoStatus, serialNo } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (algoStatus !== undefined) {
      query.algo_status = parseInt(algoStatus);
    }

    if (serialNo) {
      query.serialNo = serialNo;
    }

    const data = await ChartData.find(query)
      .sort("createdAt")
      .select(
        "createdAt total_kwh ac_run_hrs algo_status weather billing_ammount energy_savings mitigated_co2"
      );

    const chartData = data.map((item) => ({
      date: item.createdAt.toISOString(),
      energy_consumption: item.total_kwh,
      runningHours: item.ac_run_hrs,
      energySavingMode: item.algo_status === 1 ? "ON" : "OFF",
      temperature: {
        max: item.weather.max_temp,
        min: item.weather.min_temp,
      },
      billing: item.billing_ammount,
      savings: {
        percentage: item.energy_savings.savings_percent,
        co2: item.mitigated_co2,
      },
    }));

    res.json({
      success: true,
      data: chartData,
      meta: {
        total: chartData.length,
        dateRange: { from: startDate, to: endDate },
        energySavingMode:
          algoStatus !== undefined
            ? algoStatus === "1"
              ? "ON"
              : "OFF"
            : "all",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chart data",
      error: error.message,
    });
  }
};

module.exports = { getChartData };
