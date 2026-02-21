import mongoose from "mongoose";
import dotenv from "dotenv";
import City from "./model/city.model.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Clear old data (optional)
    await City.deleteMany();

    // Insert cities
    await City.insertMany([
      {
        name: "Nagpur",
        petrolPrice: 105,
        electricityRate: 8,
        gridEmissionFactor: 0.7
      },
      {
        name: "Mumbai",
        petrolPrice: 110,
        electricityRate: 10,
        gridEmissionFactor: 0.65
      },
      {
        name: "Delhi",
        petrolPrice: 96,
        electricityRate: 7,
        gridEmissionFactor: 0.75
      },
      {
        name: "Bengaluru",
        petrolPrice: 104,
        electricityRate: 9,
        gridEmissionFactor: 0.68
      },
      {
        name: "Hyderabad",
        petrolPrice: 107,
        electricityRate: 8.5,
        gridEmissionFactor: 0.72
      }
    ]);

    console.log("Cities seeded successfully 🌱");
    process.exit();
  } catch (error) {
    console.error("Error seeding data ❌", error);
    process.exit(1);
  }
};

seedData();