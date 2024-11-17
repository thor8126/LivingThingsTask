const mongoose = require("mongoose");

const AccessLogSchema = new mongoose.Schema(
  {
    accessTime: { type: String, required: true },
    accessDate: { type: String, required: true },
    employeeName: { type: String, required: true },
    algoStatus: { type: String, enum: ["ON", "OFF"], required: true },
    chartFilters: {
      startDate: String,
      endDate: String,
      serialNo: String,
    },
  },
  {
    timestamps: true,
    collection: "accessLogs",
  }
);

AccessLogSchema.index({ accessDate: 1, accessTime: 1 });

module.exports = mongoose.model("AccessLog", AccessLogSchema);
