const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const ChartData = require("../models/ChartData");
const User = require("../models/User");
const AccessLog = require("../models/AccessLog");

async function seedDatabase() {
  try {
    const jsonData = await fs.readFile(
      path.join(__dirname, "../data.json"),
      "utf-8"
    );
    const data = JSON.parse(jsonData);

    const updateDatesTo2024 = (date) => {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(2024);
      return updatedDate;
    };

    const transformedData = data.map((item) => ({
      createdAt: updateDatesTo2024(item.createdAt.$date),
      serialNo: item.serialNo,
      clientID: new mongoose.Types.ObjectId(item.clientID.$oid),
      deviceMapID: new mongoose.Types.ObjectId(item.deviceMapID.$oid),
      devices: item.devices.map(
        (device) => new mongoose.Types.ObjectId(device.$oid)
      ),
      total_kwh: item.total_kwh,
      ac_run_hrs: item.ac_run_hrs,
      ac_fan_hrs: item.ac_fan_hrs,
      algo_status: item.algo_status,
      billing_ammount: item.billing_ammount,
      cost_reduction: item.cost_reduction,
      energy_savings: item.energy_savings,
      mitigated_co2: item.mitigated_co2,
      weather: item.weather,
      updatedAt: updateDatesTo2024(item.updatedAt.$date),
    }));

    await ChartData.deleteMany({});

    await ChartData.insertMany(transformedData);

    const accessLogs = generateDummyAccessLogs();

    await AccessLog.insertMany(accessLogs);

    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      await User.create({
        username: "admin",
        password: "admin123",
        role: "admin",
      });
    }

    console.log(
      "Database seeded successfully with chart data and access logs!"
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

function generateDummyAccessLogs() {
  const employees = ["John Doe", "Jane Smith", "Alice Brown", "Bob Johnson"];
  const accessLogs = [];

  for (let i = 0; i < 10; i++) {
    const accessDate = new Date();
    accessDate.setFullYear(2024);
    accessDate.setMonth(i % 12);
    accessDate.setDate((i % 28) + 1);

    const accessTime = `${String(Math.floor(Math.random() * 24)).padStart(
      2,
      "0"
    )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;

    accessLogs.push({
      accessTime,
      accessDate: accessDate.toISOString().split("T")[0],
      employeeName: employees[Math.floor(Math.random() * employees.length)],
      algoStatus: Math.random() > 0.5 ? "ON" : "OFF",
      chartFilters: {
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        serialNo: "43200082",
      },
    });
  }

  return accessLogs;
}

module.exports = seedDatabase;
