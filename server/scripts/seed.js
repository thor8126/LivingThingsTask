const mongoose = require("mongoose");
const seedDatabase = require("../utils/seedDatabase");

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");

    console.log("Starting database seeding...");
    await seedDatabase();

    console.log("Closing MongoDB connection...");
    await mongoose.connection.close();

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

main();
