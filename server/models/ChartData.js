const mongoose = require("mongoose");

const ChartDataSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, required: true, index: true },
    serialNo: { type: String, required: true, index: true },
    clientID: { type: mongoose.Schema.Types.ObjectId, required: true },
    deviceMapID: { type: mongoose.Schema.Types.ObjectId, required: true },
    devices: [{ type: mongoose.Schema.Types.ObjectId }],
    total_kwh: { type: Number, required: true },
    ac_run_hrs: { type: Number, default: 0 },
    ac_fan_hrs: { type: Number, default: 0 },
    algo_status: { type: Number, enum: [0, 1], default: 0 },
    billing_ammount: { type: Number, default: 0 },
    cost_reduction: { type: Number, default: 0 },
    energy_savings: {
      savings_percent: { type: Number, default: 0 },
      ref_kwh: { type: Number, default: 0 },
      us_meter: { type: Number, default: 0 },
      us_calc: { type: Number, default: 0 },
      inv_factor: { type: Number, default: 0 },
    },
    mitigated_co2: { type: Number, default: 0 },
    weather: {
      max_temp: { type: Number },
      min_temp: { type: Number },
    },
  },
  {
    timestamps: true,
    collection: "chartData",
  }
);

ChartDataSchema.index({ createdAt: 1, algo_status: 1 });
ChartDataSchema.index({ serialNo: 1, createdAt: 1 });

module.exports = mongoose.model("ChartData", ChartDataSchema);
